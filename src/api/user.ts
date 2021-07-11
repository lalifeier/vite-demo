import { UserInfoResponse, UserResponse } from './model/resp/user'
import { http } from '/@/utils/http'

enum Api {
  Login = '/login',
  Register = '/register',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo'
}

export function register(params) {
  return http.post({
    url: Api.Register,
    params
  })
}

export function login(params) {
  return http.post<UserResponse>({
    url: Api.Login,
    params
  })
}

export function getUserInfo() {
  return http.get<UserInfoResponse>({
    url: Api.GetUserInfo
  })
}

export function logout() {
  return http.get({
    url: Api.Logout
  })
}
