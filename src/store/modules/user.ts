import { defineStore } from 'pinia'
import type { UserInfo } from '../types'
interface UserState {
  userInfo: Nullable<UserInfo>
  roleList: []
  accessToken?: string
  refreshToken?: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    accessToken: '',
    refreshToken: '',
    roleList: [],
  }),
  getters: {
    // getUserInfo(): UserInfo {
    //   return this.userInfo
    // }
    getToken() {
      return this.accessToken
    },
  },
  actions: {
    setUserInfo() {},
    setToken() {},
    setRoleList() {},
    resetState() {
      this.userInfo = null
      this.accessToken = ''
      this.refreshToken = ''
      this.roleList = []
    },

    login() {},
    getUserInfo() {},
    logout() {},
  },
})
