import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showLoading: false,
    JWTToken: '',
  },
  mutations: {
    showLoadings(state, value) {
      state.showLoading = value;
    },
  },
  actions: {
  },
  modules: {
  },
});
