import api from '../../api/http';

const SET_ALL_CUR = 'SET_ALL_CUR';

export default {
  namespaced: true,
  state: {
    allCur: []
  },
  getters: {
    allCur: state => state.allCur
  },
  mutations: {
    [SET_ALL_CUR]: (state, allCur) => state.allCur = allCur
  },
  actions: {
    async setAllCur ({commit}) {
      try {
        const curs = await api.request(api.urls.cur.list);
        if (curs) {
          await commit(SET_ALL_CUR, curs);
        }
      } catch (e) {}
    },
    updateAllCur ({commit}, data) {
      commit(SET_ALL_CUR, data);
    }
  }
};
