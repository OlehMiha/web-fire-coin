import Axios from 'axios';
import {Notify} from 'quasar';
import store from '../../store';
import {ContentType, Method} from './constants';
import {urls} from './urls';
import CryptoJS from 'crypto-js';

class ApiService {
  httpClient;
  httpClientBitfinex;

  urls = urls;
  constructor () {
    console.log(process.env.API_ENDPOINT);
    this.httpClient = Axios.create({baseURL: process.env.API_ENDPOINT});
    this.httpClientBitfinex = Axios.create({baseURL: '/v2/'});
  }

  request (api, data, params, bitfinexName) {
    params = params || {};
    const authToken = store.getters['auth/accessToken'];

    let {
      url, method, contentType, paginated
    } = api;

    method = method || Method.GET;
    for (const key of Object.keys(params)) {
      const pattern = new RegExp(`:${key}`, 'g');
      if (pattern.test(url)) {
        url = url.replace(pattern, params[key]);
        delete params[key];
      }
    }

    let request;
    let headers = {'Content-Type': contentType || ContentType.JSON};
    if (bitfinexName) {
      const keyUser = store.getters['users/getKeys'].find(i => i.name === bitfinexName);
      const apiKey = keyUser.key;
      const apiSecret = keyUser.secretKey;
      const nonce = (Date.now() * 1000).toString(); // Standard nonce generator. Timestamp * 1000
      const signature = `/api/v2${url}${nonce}${data ? JSON.stringify(data) : ''}`;
      // Consists of the complete url, nonce, and request body
      const sig = CryptoJS.HmacSHA384(signature, apiSecret).toString();
      // The authentication signature is hashed using the private key
      headers = {
        'Content-Type': contentType || ContentType.JSON,
        'bfx-nonce': nonce,
        'bfx-apikey': apiKey,
        'bfx-signature': sig
      };
    }

    if (authToken && !bitfinexName) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    if (contentType === ContentType.FormData) {
      let formData = new FormData();
      if (data instanceof FormData) {
        formData = data;
      } else {
        for (const key in data) {
          formData.append(key, data[key]);
        }
      }
      if (bitfinexName) {
        request = this.httpClientBitfinex[method](url, formData, {
          headers
        });
      } else {
        request = this.httpClient[method](url, formData, {
          headers
        });
      }
    } else {
      if (bitfinexName) {
        request = this.httpClientBitfinex.request({
          url,
          method,
          params,
          data,
          headers
        });
      } else {
        request = this.httpClient.request({
          url,
          method,
          params,
          data,
          headers
        });
      }
    }
    const resolve = res => ApiService.handleResponse(res, paginated);
    const reject = ApiService.handleError;

    return request.then(resolve, reject);
  }

  static handleResponse ({data, count}, paginated) {
    count = count || (data && data.count) || 0;
    data = data && data.data ? data.data : data;
    return paginated ? {data, count} : data;
  }

  static handleError (error) {
    let data = error && error.response && error.response.data && error.response.data.errors || error && error.response;

    data = (data && data.errors) || data;

    const isUnauthorized = error.response.status === 401;

    if (error && error.response && error.response.status && isUnauthorized) {
      store.dispatch('auth/logout');
    } else if (data && data.message) {
      Notify.create({
        type: 'error',
        caption: data.message
      });
    } else if (data && data.length) {
      data.forEach(err => Notify.create({
        type: 'error',
        caption: err.message || err
      }));
    } else {
      Notify.create({
        type: 'error',
        caption: error.message || error
      });
    }

    return Promise.reject(error);
  }
}

const api = new ApiService();
export default api;
