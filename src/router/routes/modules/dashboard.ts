import type { AppRouteModule } from '/@/router/types'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  meta: {
    title: 'Dashboard'
  },
  component: () => import('/@/views/dashboard/index.vue')
}

export default dashboard
