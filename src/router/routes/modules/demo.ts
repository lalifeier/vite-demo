import { AppRouteModule } from '/@/router/types'

export const demo: AppRouteModule = {
  path: '/demo',
  name: 'Demo',
  meta: {
    title: 'Demo'
  },
  children: [
    {
      path: 'table',
      name: 'table',
      component: () => import('/@/views/demo/table.vue')
    },
    {
      path: '/lazy',
      name: 'lazy',
      component: () => import('/@/views/demo/lazy.vue')
    },
    {
      path: 'virtualScroll',
      name: 'virtualScroll',
      component: () => import('/@/views/demo/virtualScroll.vue')
    }
  ]
}

export default demo
