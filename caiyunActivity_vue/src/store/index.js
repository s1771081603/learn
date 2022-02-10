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
    isLogin(state,value){
      state.isLogin = value
    },
    showLogin(state,value){
      state.showLogin = value
    },
    loginServerNumber(state,value){
      state.loginServerNumber = value
    },
    showLoading(state,value){
      state.showLoading = value
    },
  },
  actions: {},
  modules: {
    
  },
});
