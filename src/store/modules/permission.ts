import { defineStore } from 'pinia'
interface PermissionState {
  routes?: []
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({}),
  getters: {},
  actions: {},
})
