import axios from "axios";
import Cookies from "js-cookie";
import router from "@/router";
import qs from "qs";
import { clearLoginInfo, setMseHeaders } from "@/utils/index.ts";
import isPlainObject from "lodash/isPlainObject";
import { debounce } from "lodash";
import { ElMessage } from "element-plus";
import { log } from "console";
const http = axios.create({
  baseURL: window.SITE_CONFIG["apiURL"],
  timeout: 1000 * 180,
  withCredentials: true,
});

/**
 * 请求拦截
 */
http.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = Cookies.get("language") || "zh-CN";
    config.headers["token"] = Cookies.get("domp-token") || "";
    config.headers["tenant_code"] = Cookies.get("tenant_code") || "";
    // config.headers['Access-Control-Allow-Origin'] = '*'
    // 默认参数
    var defaults = {};
    // 防止缓存，GET请求默认带_t参数
    if (config.method === "get") {
      config.params = {
        ...config.params,
        ...{ _t: new Date().getTime() },
      };
    }
    if (isPlainObject(config.params)) {
      config.params = {
        ...defaults,
        ...config.params,
      };
    }
    if (isPlainObject(config.data)) {
      config.data = {
        ...defaults,
        ...config.data,
      };
      if (
        /^application\/x-www-form-urlencoded/.test(
          config.headers["content-type"]
        )
      ) {
        config.data = qs.stringify(config.data);
      }
    }
    if (config.url) {
      // if (config.url.includes('https://mse')) {
      //   config = setMseHeaders(config)
      // }
      if (config.headers["Content-Type"] === "multipart/form-data") {
        config.headers["x-sdk-content-sha256"] = "UNSIGNED-PAYLOAD";
      }
      config = setMseHeaders(config);
    }
    return config;
  },
  (error) => {
    console.log(error);
    
    return Promise.reject(error);
  }
);
const errorMessage = debounce((message, type = "error") => {
  ElMessage({
    message: message,
    duration: 1500,
    type: type,
  });
},500);
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
      router.replace({ name: "login" });
      return Promise.reject(response.data.msg);
    }
    if (response.data.code === 500) {
      if (
        response.config.url.split("?")[0] &&
        response.config.url.split("?")[0] === "/auth/secure/aad"
      ) {
        router.replace({ name: "login" });
      }
      errorMessage(
        response.data.msg ? response.data.msg : "网络错误，请检查您的网络"
      );
      return Promise.reject(response.data.msg);
    }
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === "production") {
      errorMessage("网络错误，请检查您的网络");
    } else {
      console.warn("网络错误---", error);
      ElMessage({
        message: "网络错误，请检查您的网络",
        duration: 0,
        type: "error",
        showClose: true,
      });
    }
    return Promise.reject(error);
  }
);

export default http;
