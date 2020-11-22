import {removeTokens, setAccessToken, getAccessToken} from '../../api/jwt/storage';
import api from '../../api/http';
import Router from '../../router/index';

const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
const LOGOUT = 'LOGOUT';

export default {
  namespaced: true,
  state: {
    accessToken: getAccessToken() || null
  },
  getters: {
    isAuthenticated: state => !!state.accessToken,
    accessToken: state => state.accessToken
  },
  mutations: {
    [SET_ACCESS_TOKEN]: (state, accessToken) => state.accessToken = accessToken,
    [LOGOUT]: state => {
      state.accessToken = null;
    }
  },
  actions: {
    async login ({commit}, data) {
      try {
        const {token} = await api.request(api.urls.auth.login, data);
        if (token) {
          await setAccessToken(token);
          await commit(SET_ACCESS_TOKEN, token);
        }
      } catch (e) {}
    },
    async register ({commit}, data) {
      try {
        const {token} = await api.request(api.urls.auth.register, data);
        if (token) {
          await setAccessToken(token);
          await commit(SET_ACCESS_TOKEN, token);
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
