import { createPermissionGuard } from './permission'
import { createProgressGuard } from './progress'
import router from '/@/router'

export function setupRouterGuard() {
  createProgressGuard(router)
  createPermissionGuard(router)
}
