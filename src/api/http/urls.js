import {Method} from './constants';

export const urls = {
  auth: {
    login: {
      url: '/user/login/',
      method: Method.POST
    }
  },
  background: {
    list: {
      url: '/background/'
    },
    one: {
      load: {
        url: '/background/:id/'
      },
      create: {
        url: '/background/',
        method: Method.POST
        // contentType: 'multipart/form-data'
      },
      update: {
        url: '/background/:id/',
        method: Method.PUT
      },
      updatePatch: {
        url: '/background/:id/',
        method: Method.PATCH
      },
      remove: {
        url: '/background/:id/',
        method: Method.DELETE
      }
    }
  }
};
