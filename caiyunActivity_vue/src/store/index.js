import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    showLogin: false,
    loginServerNumber: '',
    showLoading: false,
  },
  mutations: {
    isLogins(state,value){
      state.isLogin = value
    },
    showLogins(state,value){
      state.showLogin = value
    },
    loginServerNumbers(state,value){
      state.loginServerNumber = value
    },
    showLoadings(state,value){
      state.showLoading = value
    },
  },
  actions: {},
  modules: {
    
  },
});
