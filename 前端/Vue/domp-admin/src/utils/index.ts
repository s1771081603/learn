import signer from "@/utils/signer";
import Cookies from "js-cookie";
import { commonStores } from '@/stores'

// 设置网关
export function setMseHeaders(config: any) {
  let body = '', url = '';
  let signedHeaders:any = {};
  if (config.data && config.headers['Content-Type'] !== 'multipart/form-data') {
    body = JSON.stringify(config.data);
  }
  if (config.headers['x-sdk-content-sha256']) {
    signedHeaders['x-sdk-content-sha256'] = config.headers['x-sdk-content-sha256'];
  }
  if (config.params) {
    // buildURL 方法会导致转码问题，故使用自有方法替代
    url = buildURLNew(config.baseURL, config.url, config.params);
    url = decodeURIComponent(url).replace(/%2C/gi, ','); // %2c转成逗号 mse网关sdk
  } else {
    url = config.baseURL + config.url;
  }
  let req = signer.HttpRequest(config.method.toLocaleUpperCase(), url, signedHeaders, body);
  let opt = signer.Sign(req);
  config.headers['X-Sdk-Date'] = opt.headers['X-Sdk-Date'];
  config.headers['Authorization'] = opt.headers['v587sign'];
  return config;
}

/**
 * axios 的 buildURL 方法会导致转码问题，故使用自有方法替代
 */
function buildURLNew(baseURL: any, apiPath: any, apiParams: any) {
  const wholeUrl = baseURL + (apiPath[0] === '/' ? apiPath : `/${apiPath}`);
  let url = wholeUrl + '?';

  let keys = Object.keys(apiParams);
  for (let key of keys) {
    url += `${key}=${encodeURIComponent(apiParams[key])}&`;
    // url += `${key}=${apiParams[key]}&`;
  }
  url = url.slice(0, -1);
  return url;
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  commonStores().resetStore();
  Cookies.remove('domp-token');
  delProjectFromSession();
  window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] = false;
  window.SITE_CONFIG['permissions'] = [];
}

export function delProjectFromSession() {
  try {
    sessionStorage.removeItem('currentProject');
  } catch {}
}