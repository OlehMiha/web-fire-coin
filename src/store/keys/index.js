import api from '../../api/http';

const SET_KEYS = 'SET_KEYS';
const ADD_KEY = 'ADD_KEY';
const DELETE_KEY = 'DELETE_KEY';

export default {
  namespaced: true,
  state: {
    keys: []
  },
  mutations: {
    [SET_KEYS]: (state, keys) => state.keys = keys,
    [ADD_KEY]: (state, key) => state.keys.push(key),
    [DELETE_KEY]: (state, id) => state.keys = state.keys.filter(item => item['_id'] !== id)
  },
  actions: {
    async setKeys ({commit}) {
      try {
        const keys = await api.request(api.urls.keys.list);
        if (keys) {
          await commit(SET_KEYS, keys);
        }
      } catch (e) { throw e; }
    },
    async deleteKeys ({commit}, id) {
      try {
        const res = await api.request(api.urls.keys.one.remove, null, id);
        if (res && res.id) {
          await commit(DELETE_KEY, res.id);
        }
      } catch (e) { throw e; }
    },
    async addKey ({commit}, {name, keyUser, secretKey}) {
      try {
        const key = await api.request(api.urls.keys.one.create, {name, key: keyUser, secretKey});
        if (key && key.NewAccount) {
          await commit(ADD_KEY, key.NewAccount);
        }
      } catch (e) { throw e; }
    }
  }
};
