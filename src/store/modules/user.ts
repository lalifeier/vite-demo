import { store } from '@/store'
import { defineStore } from 'pinia'

interface UserState {
  accessToken?: string
  refreshToken?: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({}),
  getters: {},
  actions: {},
})

export function useUserStoreWidthOut() {
  return useUserStore(store)
}
