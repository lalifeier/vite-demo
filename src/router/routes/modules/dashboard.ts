import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '../constant'

export const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  meta: {
    title: 'Dashboard'
  },
  component: LAYOUT,
  redirect: '/dashboard/index',
  children: [
    {
      path: 'index',
      name: 'Index',
      meta: {
        title: 'Dashboard'
      },
      component: () => import('@/views/dashboard/index.vue')
    }
  ]
}

export default dashboard
