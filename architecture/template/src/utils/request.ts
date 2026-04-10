import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || '/api',
  timeout: 10000
})

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // 例如：添加 token
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    // 可以在这里添加 loading 状态
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    const { data } = response

    // 如果响应码不是 200，根据后端约定的 code 处理
    if (data.code !== 200) {
      // 特定业务错误码处理
      switch (data.code) {
        case 401:
          ElMessage.error('未授权，请重新登录')
          // 清除本地 token 和用户信息
          localStorage.removeItem('token')
          // 这里可以跳转到登录页
          // router.replace({ path: '/login' })
          break
        case 402:
          ElMessage.error('没有权限访问')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(data.msg || '请求失败')
      }

      return Promise.reject(new Error(data.msg || `请求失败，状态码: ${data.code}`))
    }
    return response?.data?.data
  },
  (error: AxiosError) => {
    // 对响应错误做点什么
    console.error('响应拦截器错误:', error)

    // 处理网络错误或超时
    if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时，请稍后重试')
    } else if (error.message === 'Network Error') {
      ElMessage.error('网络连接异常，请检查网络')
    } else if (error.response) {
      // 服务器返回了错误状态码（非 2xx）
      const status = error.response.status
      switch (status) {
        case 400:
          ElMessage.error('请求参数错误')
          break
        case 401:
          ElMessage.error('未授权，请重新登录')
          localStorage.removeItem('token')
          break
        case 403:
          ElMessage.error('拒绝访问')
          break
        case 404:
          ElMessage.error('请求地址不存在')
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(`请求失败: ${status}`)
      }
    } else {
      // 其他未知错误
      ElMessage.error('请求失败，请稍后重试')
    }

    return Promise.reject(error)
  }
)

export default request
