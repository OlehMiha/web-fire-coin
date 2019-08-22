import {LocalStorage} from 'quasar';
const ACCESS_TOKEN_KEY = 'P0';
const REFRESH_TOKEN_KEY = 'P1';
const TIME_ACCESS_TOKEN = 'T0';

const getPayload = jwt => {
  try {
    const payload = jwt.split('.')[1];
    return JSON.parse(atob(payload)).exp * 1000;
  } catch (e) {
    return null;
  }
};

export const setAccessToken = token => {
  LocalStorage.set(ACCESS_TOKEN_KEY, token);
  LocalStorage.set(TIME_ACCESS_TOKEN, getPayload(token));
};

export const setRefreshToken = token => {
  LocalStorage.set(REFRESH_TOKEN_KEY, token);
};

export const getAccessToken = () => {
  return LocalStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return LocalStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getTimeToken = () => {
  return LocalStorage.getItem(TIME_ACCESS_TOKEN);
};

export const removeTokens = () => {
  LocalStorage.remove(ACCESS_TOKEN_KEY);
  LocalStorage.remove(REFRESH_TOKEN_KEY);
  LocalStorage.remove(TIME_ACCESS_TOKEN);
};
