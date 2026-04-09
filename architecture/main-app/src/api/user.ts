import request from '@/utils/request'

interface User {
  id?: number
  username: string
  email: string
  phone: string
  role: string[]
  avatar: string
  status: number
}

/**
 * 获取用户信息
 * @returns Promise<User>
 */
export function getUserInfo() {
  return request.get<User>('/api/user/info')
}

/**
 * 获取用户列表
 * @param params
 * @returns Promise<ApiResponse<T>>
 */
export function getUserList(params: { page: number; size: number; username?: string; role?: string; status?: string }) {
  return request.get('/api/user', { params })
}

/**
 * 添加用户信息
 * @param params
 * @returns Promise<ApiResponse<T>>
 */
export function addUserInfo(params: User) {
  return request.post('/api/user/add', params)
}

/**
 * 获取用户详情
 * @param id
 * @returns Promise<ApiResponse<T>>
 */
export function getUserDetail(id: number) {
  return request.get<User>(`/api/user/${id}`)
}

/**
 * 更新用户信息
 * @param data
 * @returns Promise<ApiResponse<T>>
 */
export function updateUserInfo(data: Partial<User>) {
  return request.put<User>('/api/user/info', data)
}

/**
 * 删除用户
 * @param data
 * @returns Promise<ApiResponse<T>>
 */
export function deleteUserInfo(data: { id: string }) {
  return request.delete('/api/user', { data })
}

/**
 * 修改用户密码
 * @param data
 * @returns Promise<ApiResponse<T>>
 */
export function updateUserPassword(data: { oldPassword: string; newPassword: string; confirmPassword: string }) {
  return request.put('/api/user/password', data)
}

/**
 * 修改用户头像
 * @param data
 * @returns Promise<ApiResponse<T>>
 */
export function updateUserAvatar(data: FormData) {
  return request.put('/api/user/avatar', data)
}

/**
 * 修改用户状态
 * @param data
 * @returns Promise<ApiResponse<T>>
 */
export function updateUserStatus(data: { status: string }) {
  return request.put('/api/user/status', data)
}
