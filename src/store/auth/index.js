import {removeTokens, setAccessToken, setRefreshToken, getAccessToken, getRefreshToken} from '../../api/jwt/storage';
// import api from '../../api/http';
import Router from '../../router/index';

const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
const LOGOUT = 'LOGOUT';

export default {
  namespaced: true,
  state: {
    accessToken: getAccessToken() || null,
    refreshToken: getRefreshToken() || null
  },
  getters: {
    isAuthenticated: state => !!state.accessToken,
    accessToken: state => state.accessToken
  },
  mutations: {
    [SET_ACCESS_TOKEN]: (state, accessToken) => state.accessToken = accessToken,
    [SET_REFRESH_TOKEN]: (state, refreshToken) => state.refreshToken = refreshToken,
    [LOGOUT]: state => {
      state.accessToken = null;
      state.refreshToken = null;
    }
  },
  actions: {
    async login ({commit}, data) {
      try {
        // const {token} = await api.request(api.urls.auth.login, data);
        const token = 'token';
        if (token) {
          await setAccessToken(token);
          await setRefreshToken(token);
          await commit(SET_ACCESS_TOKEN, token);
          await commit(SET_REFRESH_TOKEN, token);
          // await verifyTokens();
        }
      } catch (e) {}
    },
    logout ({commit}) {
      removeTokens();
      commit(LOGOUT);
      Router.push('/login');
    }
  }
};
