import { router } from '@/router'
import { createPermissionGuard } from './permission'
import { createProgressGuard } from './progress'

export function setupRouterGuard() {
  createProgressGuard(router)
  createPermissionGuard(router)
}
