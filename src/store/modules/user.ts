import { defineStore } from 'pinia'
import type { UserInfo } from '../types'
import { UserInfoResponse } from '/@/api/model/resp/user'
import { getUserInfo, login, logout } from '/@/api/user'
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

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    accessToken: '',
    refreshToken: '',
    roleList: []
  }),
  getters: {
    // getUserInfo(): UserInfo {
    //   return this.userInfo ||
    // },
    getToken(): string {
      return this.accessToken
    }
    // getRoleList(): RoleEnum[] {
    //   return this.roleList.length > 0 ? this.roleList : []
    // }
  },
  actions: {
    setUserInfo(info: UserInfo) {
      this.userInfo = info
    },
    setToken(accessToken, refreshToken) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    },
    setRoleList(roleList) {
      this.roleList = roleList
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
      window.location.reload()
    }
  }
})
