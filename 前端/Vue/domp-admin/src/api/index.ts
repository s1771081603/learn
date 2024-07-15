import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { isPlainObject } from "lodash";
import { clearLoginInfo, setMseHeaders } from '@/utils';
import { ElMessage } from "element-plus";
import { debounce } from "lodash";
import router from '@/routers';

const http: AxiosInstance = axios.create({
  baseURL: window.SITE_CONFIG['apiURL'],
  timeout: 1000 * 180,
  withCredentials: true
})

const errorMessage = debounce(message => {
  ElMessage({
    type: 'error',
    message: message,
    duration: message.includes('单点登录失败，请联系技术支持') ? 0 : 1500,
    showClose: message.includes('单点登录失败，请联系技术支持') ? true : false
  })
}, 500);

// 请求拦截
http.interceptors.request.use(
  (config) => {
    config.headers['token'] = Cookies.get('domp-token') || '';

    // 防止缓存，GET请求默认带_t参数
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        ...{ _t: new Date().getTime() }
      };
    }

    if (isPlainObject(config.params)) {
      config.params = {
        ...config.params
      };
    }
    
    if (isPlainObject(config.data)) {
      config.data = {
        ...config.data
      };
      if (/^application\/x-www-form-urlencoded/.test(config.headers['content-type'])) {
        config.data = JSON.stringify(config.data);
      }
    }

    if (config.url) {
      if (config.headers['Content-Type'] === 'multipart/form-data') {
        config.headers['x-sdk-content-sha256'] = 'UNSIGNED-PAYLOAD';
      }
      config = setMseHeaders(config);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

/**
 * 响应拦截
 */
http.interceptors.response.use(
  (response) => {
    if (
      response.data.code === 401 ||
      response.data.code === 10001 ||
      response.data.code === 10010 ||
      response.data.code === 10005
    ) {
      clearLoginInfo();
      const href = window.location.href;
      // console.warn(href, href.includes('inlet=mai'));
      if (href.includes('mai')) {
        router.replace({ name: 'login', query: { redirectUrl: href.replace(/http.*?#/, '') } });
      } else {
        router.replace({ name: 'login' });
      }
      return Promise.reject(response.data.msg);
    }
    if (response.data.code === 500) {
      if (
        response.config.url.split('?')[0] &&
        response.config.url.split('?')[0] === '/auth/secure/aad'
      ) {
        router.replace({ name: 'login' });
      }
      if(['/volvo/domp/api/quality/statistics/defect/data/list',
          '/volvo/domp/api/quality/statistics/defect/overview',
          '/volvo/domp/api/quality/statistics/defect/priority',
          '/volvo/domp/api/quality/statistics/defect/project/status',
          '/volvo/domp/api/quality/statistics/defect/reason'
      ].includes(response.config.url)) {
        return response;
      }
      // 部分情况下错误不能被直接报出，验证 headers 中的 Ban-Error-Message 参数对报错进行限制
      const { config: { headers } } = response;
      !headers['Ban-Error-Message'] && errorMessage(response.data.msg ? response.data.msg : '网络错误，请检查您的网络');
      return Promise.reject(response.data.msg);
    }
    return response;
  },
  (error) => {
    console.log(error, '进入错误')
    errorMessage('网络错误，请检查您的网络');
    return Promise.reject(error);
  }
);

export default http;