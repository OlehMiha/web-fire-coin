import * as admin from '../rpc/admin';
import {removeTokens, setAccessToken, getAccessToken, getRefreshToken, getTimeToken} from './jwt/storage';
import store from '../store';

const api = {admin};
const UPDATE_IN = 2;

export const refresh = async values => {
  try {
    const res = await api.admin.refreshTokenEvent({...values});
    const accessToken = await res.getAccesstoken();
    setAccessToken(accessToken);
    return accessToken;
  } catch (err) {
    removeTokens();
  }
  return null;
};

const needRefresh = () => {
  const refreshToken = getRefreshToken();
  const diff = getTimeToken() - Date.now();
  const minutes = Math.ceil(diff / 1000 / 60);
  if (minutes <= UPDATE_IN) {
    return refresh({refreshToken});
  }
  return null;
};

// On all api
export const onApi = async (module, func, options, noToken) => {
  if (!noToken) {
    if (!getRefreshToken() || !getAccessToken()) {
      return;
    }
    await needRefresh();
  }

  try {
    const res = await api[module][func](options);
    if (res) {
      return res.toObject();
    }
  } catch (e) {
    if (process.env.REACT_APP_NODE_ENV !== 'tag') {
      console.log('%c%s', 'color: coral;', '!¯¯¯¯¯Start Api Error¯¯¯¯¯!');
      console.log('%c%s', 'color: red;', 'Module grpc:', module);
      console.log('%c%s', 'color: red;', 'API func:', func);
      console.log('%c%s', 'color: red;', 'Options (param):', options);
      console.log('%c%s', 'color: red;', 'Error:', e.message);
      console.log('%c%s', 'color: coral;', '!______End Api Error______!');
      console.log(' ');
    }
    throw new Error(e.message);
  }
  return null;
};

// USER
export const verifyTokens = async () => {
  let accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();
  const newAccessToken = await needRefresh();
  if (newAccessToken) {
    accessToken = newAccessToken;
  }
  if (accessToken && refreshToken) {
    try {
      const res = await api.admin.verifyTokens({accessToken, refreshToken});
      if (res) {
        return res.toObject();
      } else {
        return res;
      }
    } catch (e) {
      await store.dispatch('auth/logout');
    }
  }
  return null;
};
