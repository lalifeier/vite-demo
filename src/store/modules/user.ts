import { defineStore } from 'pinia'
import { RoleEnum } from '../enum'
import type { UserInfo } from '../types'
import { UserInfoResponse } from '/@/api/model/resp/user'
import { getUserInfo, login, logout, refresh } from '/@/api/user'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROLE_LIST_KEY, USER_INFO_KEY } from '/@/enums/cache'
import { _localStorage } from '/@/utils/cache'
interface UserState {
  userInfo: Nullable<UserInfo>
  roleList: []
  accessToken: string
  refreshToken: string
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
      return this.userInfo || _localStorage.get(USER_INFO_KEY)
    },
    getAccessToken(): string {
      return this.accessToken || _localStorage.get(ACCESS_TOKEN_KEY)
    },
    getRefreshToken(): string {
      return this.accessToken || _localStorage.get(REFRESH_TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : _localStorage.get(ROLE_LIST_KEY)
    }
  },
  actions: {
    setUserInfo(info: UserInfo) {
      this.userInfo = info
      _localStorage.set(USER_INFO_KEY, info)
    },
    setToken(accessToken, refreshToken) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      _localStorage.set(ACCESS_TOKEN_KEY, accessToken)
      _localStorage.set(REFRESH_TOKEN_KEY, refreshToken)
    },
    setRoleList(roleList) {
      this.roleList = roleList
      _localStorage.set(ROLE_LIST_KEY, roleList)
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
      this.setRoleList(role)
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
