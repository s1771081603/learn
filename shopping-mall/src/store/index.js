import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false, // 是否登录
    showLogin: false, // 打开登录弹窗
    showRegister: false, // 打开注册弹窗
    loginServerNumber: '', // 登记登录号码
    showLoading: false, // 加载中
    cartNum: 0, // 购物车商品数
  },
  mutations: {
    isLogin(state,value){
      state.isLogin = value
    },
    showLogin(state,value){
      state.showLogin = value
    },
    showRegister(state,value){
      state.showRegister = value
    },
    loginServerNumber(state,value){
      state.loginServerNumber = value
    },
    showLoading(state,value){
      state.showLoading = value
    },
    cartNum(state,value){
      state.cartNum = value
    }
  },
  actions: {
  },
  modules: {
  }
})
