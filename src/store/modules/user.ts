import { defineStore } from 'pinia'
import type { UserInfo } from '../types'
import { UserInfoResponse } from '/@/api/model/resp/user'
import { getUserInfo, login, logout } from '/@/api/user'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROLES_KEY, USER_INFO_KEY } from '/@/enums/cache'
interface UserState {
  userInfo: Nullable<UserInfo>
  roleList: []
  accessToken: string
  refreshToken: string
}

export enum RoleEnum {
  ADMIN = 'admin',
  TEST = 'test'
}

function getCache<T>(key) {
  return localStorage.get(key) as T
}

export function setCache(key, value) {
  localStorage.get(key, value)
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    accessToken: '',
    refreshToken: '',
    roleList: []
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getCache<UserInfo>(USER_INFO_KEY)
    },
    getToken(): string {
      return this.accessToken || getCache(ACCESS_TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getCache<RoleEnum[]>(ROLES_KEY)
    }
  },
  actions: {
    setUserInfo(info: UserInfo) {
      this.userInfo = info
      setCache(USER_INFO_KEY, info)
    },
    setToken(accessToken, refreshToken) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      setCache(ACCESS_TOKEN_KEY, accessToken)
      setCache(REFRESH_TOKEN_KEY, refreshToken)
    },
    setRoleList(roleList) {
      this.roleList = roleList
      setCache(ROLES_KEY, roleList)
    },
    resetState() {
      this.userInfo = null
      this.accessToken = ''
      this.refreshToken = ''
      this.roleList = []
    },
    async login(params): Promise<UserInfoResponse> {
      try {
        const data = await login(params)
        const { accessToken, refreshToken } = data
        this.setToken(accessToken, refreshToken)
        const userInfo = await this.getUserInfo()
        return userInfo
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserInfo() {
      const userInfo = await getUserInfo()
      const { roles } = userInfo
      const roleList = roles.map((item) => item.value) as RoleEnum[]
      this.setUserInfo(userInfo)
      this.setRoleList(roleList)
      return userInfo
    },
    async logout() {
      try {
        await logout()
      } catch (error) {
        console.log(error)
      }
      this.setToken(undefined, undefined)
      window.location.reload()
    }
  }
})
