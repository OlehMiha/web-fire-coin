import Vue from 'vue';
import Vuex from 'vuex';
import {getAccessToken, getRefreshToken} from '../api/jwt/storage';

import auth from './auth';
// import users from './users';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth
  }
});

if (getAccessToken && getRefreshToken) {
  // verifyTokens();
}
export default store;
