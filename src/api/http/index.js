import Axios from 'axios';
import {Notify} from 'quasar';
import store from '../../store';
import {ContentType, Method} from './constants';
import {urls} from './urls';

class ApiService {
  httpClient;

  urls = urls;

  constructor () {
    this.httpClient = Axios.create({baseURL: process.env.API_ENDPOINT});
  }

  request (api, data, params) {
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
    const headers = {
      'Content-Type': contentType || ContentType.JSON
    };

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    if (contentType === ContentType.FormData) {
      const formData = data instanceof FormData ? data : new FormData(data);
      request = this.httpClient[method](url, formData, {
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

    return request.then(res => ApiService.handleResponse(res, paginated), ApiService.handleError);
  }

  static handleResponse ({data, count}, paginated) {
    count = count || (data && data.count) || 0;
    data = data && data.data ? data.data : data;
    return paginated ? {data, count} : data;
  }

  static handleError (error) {
    let data = error && error.response && error.response.data && error.response.data.errors;
    data = (data && data.errors) || data;
    if (data && data.ERROR_MESSAGE) {
      Notify.create(data.ERROR_MESSAGE);
    } else if (data && data.length) {
      data.forEach(err => Notify.create(err.ERROR_MESSAGE || err));
    } else {
      Notify.create(error.message || error);
    }
    return Promise.reject(error);
  }
}

const api = new ApiService();
export default api;
