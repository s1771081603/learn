import axios from 'axios';
import { Toast } from 'vant';
import store from '../store/index';

const instance = axios.create({
  baseURL: 'https://api.shop.eduwork.cn',
  // 超时时间
  timeout: 60000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})
instance.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if(config.headers.showLoading){
      store.commit('showLoadings', true)
    }
    return config;
  },
  error => {
    store.commit('showLoadings', false)
    Toast('网络异常，请稍后再试');
    return Promise.error(error);
  }
);

// 响应拦截（配置请求回来的信息）
instance.interceptors.response.use(
  response => {
    if(response.config.headers.showLoading){
      store.commit('showLoadings', false)
    }
    if (typeof response.data == 'string') { //huawei mate9系列
      try {
        response.data = JSON.parse(response.data);
      } catch (e) {
        console.log('response result parse error ' +e);
      }
    }
    return response;
  },
  error => {
    if(error.config.headers.showLoading){
      store.commit('showLoadings', false)
    }
    if (error.response) {
      if(error.response.statusText){
        Toast(error.response.statusText)
      } else {
        Toast('系统繁忙，请稍后再试');
      }
    } else {
      Toast('系统繁忙，请稍后再试');
    }
    return Promise.reject(error)
  }

);

export default instance