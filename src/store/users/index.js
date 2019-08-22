import {onApi} from '../../api';

const SET_DATA_TABLE_USERS = 'SET_DATA_TABLE_USERS';

export default {
  namespaced: true,
  state: {
    dataTableUsers: null
  },
  getters: {
    dataTableUsers: state => state.dataTableUsers
  },
  mutations: {
    [SET_DATA_TABLE_USERS]: (state, dataTableUsers) => state.dataTableUsers = dataTableUsers
  },
  actions: {
    async setDataTableUsers ({commit}) {
      try {
        const res = await onApi('admin', 'users');
        if (res && res.usersMap) {
          const users = [];
          for (const key in res.usersMap) {
            users.push({id: res.usersMap[key][0], ...res.usersMap[key][1]});
          }
          await commit(SET_DATA_TABLE_USERS, users);
        }
      } catch (e) {}
    },
    async deleteUser ({commit, getters}, data) {
      try {
        await onApi('admin', 'delUser', data);
        const users = getters.dataTableUsers.filter(i => i.id !== data.id);
        await commit(SET_DATA_TABLE_USERS, users);
      } catch (e) {}
    }
  }
};
