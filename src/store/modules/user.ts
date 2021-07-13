import { defineStore } from 'pinia'
import { RoleEnum } from '../enum'
import type { UserInfo } from '../types'
import { UserInfoResponse } from '/@/api/model/resp/user'
import { getUserInfo, login, logout, refresh } from '/@/api/user'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ROLES_KEY,
  ROLE_KEY,
  USER_INFO_KEY
} from '/@/enums/cache'
interface UserState {
  userInfo: Nullable<UserInfo>
  role: []
  accessToken: string
  refreshToken: string
}

function getCache<T>(key) {
  return localStorage.get(key) as T
}

function setCache(key, value) {
  localStorage.get(key, value)
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    accessToken: '',
    refreshToken: '',
    role: []
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getCache<UserInfo>(USER_INFO_KEY)
    },
    getAccessToken(): string {
      return this.accessToken || getCache(ACCESS_TOKEN_KEY)
    },
    getRefreshToken(): string {
      return this.accessToken || getCache(REFRESH_TOKEN_KEY)
    },
    getRole(): RoleEnum[] {
      return this.role.length > 0 ? this.role : getCache<RoleEnum[]>(ROLE_KEY)
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
    setRole(role) {
      this.role = role
      setCache(ROLES_KEY, role)
    },
    resetState() {
      this.userInfo = null
      this.accessToken = ''
      this.refreshToken = ''
      this.role = []
    },
    async login(params): Promise<UserInfoResponse> {
      try {
        const data = await login(params)
        const { access_token, refresh_token } = data
        this.setToken(access_token, refresh_token)
        const userInfo = await this.getUserInfo()
        return userInfo
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserInfo() {
      const userInfo = await getUserInfo()
      const { role } = userInfo
      this.setUserInfo(userInfo)
      this.setRole(role)
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
    },
    async refresh() {
      try {
        const data = await refresh(this.getRefreshToken)
        const { access_token, refresh_token } = data
        this.setToken(access_token, refresh_token)
        return access_token
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
