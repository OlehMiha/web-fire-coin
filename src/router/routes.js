import store from '../store';

import {
  IsGuest,
  IsAuthenticated
} from './guards';

const routes = [
  {
    path: '/login',
    component: () => import('layouts/Blank.vue'),
    beforeEnter: IsGuest,
    children: [
      {
        path: '',
        component: () => import('pages/Login.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    beforeEnter: IsAuthenticated,
    children: [
      {
        path: 'home',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'settings',
        component: () => import('pages/Settings.vue')
      },
      {
        path: '',
        redirect: () => store.getters['auth/isAuthenticated'] ? 'users' : 'login'
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
