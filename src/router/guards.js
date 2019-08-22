import store from '../store';

export const IsGuest = (to, from, next) => store.getters['auth/isAuthenticated'] ? next('/') : next();
export const IsAuthenticated = (to, from, next) => store.getters['auth/isAuthenticated'] ? next() : next('login');
