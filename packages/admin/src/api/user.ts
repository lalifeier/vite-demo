import { http } from '@/utils/http'
import { UserInfoResponse, UserResponse } from './model/resp/user'

enum Api {
  Login = '/user/login',
  Register = '/user/register',
  Logout = '/user/logout',
  GetUserInfo = '/user/getUserInfo',
  Refresh = '/user/refresh',
}

export function register(params) {
  return http.post({
    url: Api.Register,
    params,
  })
}

export function login(params) {
  return http.post<UserResponse>({
    url: Api.Login,
    params,
  })
}

export function getUserInfo() {
  return http.get<UserInfoResponse>({
    url: Api.GetUserInfo,
  })
}

export function logout() {
  return http.get({
    url: Api.Logout,
  })
}

export function refresh(params) {
  return http.get({
    url: Api.Refresh,
    params,
  })
}
