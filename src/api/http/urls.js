import {Method} from './constants';

export const urls = {
  auth: {
    login: {
      url: '/auth/login',
      method: Method.POST
    },
    register: {
      url: '/auth/register',
      method: Method.POST
    }
  },
  keys: {
    list: {
      url: '/keys'
    },
    one: {
      load: {
        url: '/keys/:id'
      },
      create: {
        url: '/keys',
        method: Method.POST
      },
      remove: {
        url: '/keys/:id',
        method: Method.DELETE
      }
    }
  },
  bitfinex: {
    wallets: {
      url: '/auth/r/wallets',
      method: Method.POST
    },
    orders: {
      url: '/auth/r/orders',
      method: Method.POST
    }
  }
};
