import api from '../../api/http';

const SET_ALL_CUR = 'SET_ALL_CUR';
const SET_ALL_CUR_SYMBOL = 'SET_ALL_CUR_SYMBOL';

export default {
  namespaced: true,
  state: {
    allCur: [],
    allCurSymbol: []
  },
  getters: {
    allCur: state => state.allCur,
    allCurSymbol: state => state.allCurSymbol
  },
  mutations: {
    [SET_ALL_CUR]: (state, allCur) => state.allCur = allCur,
    [SET_ALL_CUR_SYMBOL]: (state, allCurSymbol) => state.allCurSymbol = allCurSymbol
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
    },
    updateAllCurSymbol ({commit}, data) {
      commit(SET_ALL_CUR_SYMBOL, data);
    }
  }
};
