import api from '../api/http';

export default ({Vue}) => {
  Vue.prototype.$api = api;
};
