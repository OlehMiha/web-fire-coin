import api from '../../api/http';

const SET_KEYS = 'SET_KEYS';
const ADD_KEY = 'ADD_KEY';
const DELETE_KEY = 'DELETE_KEY';

const SET_WALLETS = 'SET_WALLETS';

const SET_ORDERS = 'SET_ORDERS';

export default {
  namespaced: true,
  state: {
    keys: [],
    users: {},
    wallets: null,
    orders: null
  },
  getters: {
    getKeys: state => state.keys
  },
  mutations: {
    [SET_KEYS]: (state, keys) => {
      keys.forEach(key => {
        state.users[key.name] = key;
      });
      state.keys = keys;
    },
    [ADD_KEY]: (state, key) => {
      state.users[key.name] = key;
      state.keys.push(key);
    },
    [DELETE_KEY]: (state, id) => state.keys = state.keys.filter(item => item['_id'] !== id),
    [SET_WALLETS]: (state, {name, wallets}) => {
      wallets.orders = wallets;
      if (state.users[name] && !state.users[name].wallets) {
        state.users[name].wallets = [];
      }
      wallets.forEach(wallet => {
        if (wallet[0] === 'exchange') {
          if (Number(wallet[2]) >= 0.000001) {
            state.users[name].wallets.push({
              symbol: wallet[1],
              amount: wallet[2],
              block: wallet[4],
              text: wallet[5]
            });
            state.users = {...state.users};
          }
        }
      });
    },
    [SET_ORDERS]: (state, {name, orders}) => {
      state.orders = orders;
      if (state.users && !state.users.orders || state.users.orders.find(i => i.name === name)) {
        state.users.orders = [];
      }
      orders.forEach(order => {
        state.users.orders.push({
          name,
          symbol: order[3].slice(1),
          amount: order[6],
          type: order[8],
          status: order[13],
          price: order[16]
        });
        state.users = {...state.users};
      });
    }
  },
  actions: {
    async setOrders ({commit, state, dispatch}, name) {
      if (name) {
        try {
          const orders = await api.request(api.urls.bitfinex.orders, null, null, name);
          if (orders) {
            await commit(SET_ORDERS, {name, orders});
          }
        } catch (e) { throw e; }
      } else {
        state.keys.forEach(key => {
          dispatch('setOrders', key.name);
        });
      }
    },
    async setWallets ({commit, state, dispatch}, name) {
      if (name) {
        try {
          const wallets = await api.request(api.urls.bitfinex.wallets, null, null, name);
          if (wallets) {
            await commit(SET_WALLETS, {name, wallets});
          }
        } catch (e) { throw e; }
      } else {
        state.keys.forEach(key => {
          dispatch('setWallets', key.name);
        });
      }
    },
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
