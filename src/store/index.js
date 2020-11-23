import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import cur from './cur';
import users from './users';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    cur,
    users
  }
});
export default store;
