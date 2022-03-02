import axios from 'axios'
import { Toast } from 'vant'
import store from '../store/index'
let baseURL;

const instance = axios.create({
  baseURL: baseURL,
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
      store.commit('showLoading', true)
    }
    return config;
  },
  error => {
    store.commit('showLoading', false)
    Toast('网络异常，请稍后再试');
    return Promise.error(error);
  }
);

// 响应拦截（配置请求回来的信息）
instance.interceptors.response.use(
  response => {
    if(response.config.headers.showLoading){
      store.commit('showLoading', false)
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
      store.commit('showLoading', false)
    }
    if (error.response) {
      if(error.response.data && error.response.data.message){
        Toast(error.response.data.message)
      }else{
        switch (error.response.status) {
          case 400:
            Toast('请求参数异常');
            break;
          case 401:
            Toast('密码错误或账号不存在！');
            break;
          case 403:
            Toast('无访问权限，请联系企业管理员');
            break;
          default:
            Toast('系统繁忙，请稍后再试');
        }
      }
    } else {
      Toast('系统繁忙，请稍后再试');
    }
    return Promise.reject(error)
  }

);

export default instance