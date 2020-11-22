import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import cur from './cur';
import keys from './keys';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    cur,
    keys
  }
});
export default store;
