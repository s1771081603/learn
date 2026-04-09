import request from '@/utils/request'

interface LoginParams {
  username: string
  password: string
  captcha: string
}

/**
 * 登录
 * @param params 登录参数
 * @returns Promise<ApiResponse<T>>
 */
export function login(params: LoginParams) {
  return request.post('/api/login', params)
}

/**
 * 获取验证码
 * @returns Promise<ApiResponse<T>>
 */
export function getCaptcha() {
  return request.get('/api/captcha')
}

/**
 * 登出
 * @returns Promise<ApiResponse<T>>
 */
export function logout() {
  return request.post('/api/logout')
}
