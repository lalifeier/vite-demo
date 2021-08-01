import { AppRouteModule } from '/@/router/types'
const LAYOUT = () => import('/@/layouts/default/index.vue')

export const demo: AppRouteModule = {
  path: '/demo',
  name: 'Demo',
  meta: {
    title: 'Demo'
  },
  component: LAYOUT,
  children: [
    {
      path: 'table',
      name: 'table',
      component: () => import('/@/views/demo/table.vue')
    },
    {
      path: 'lazy',
      name: 'lazy',
      component: () => import('/@/views/demo/lazy.vue')
    },
    {
      path: 'virtualScroll',
      name: 'virtualScroll',
      component: () => import('/@/views/demo/virtualScroll.vue')
    },
    {
      path: 'loading',
      name: 'loading',
      component: () => import('/@/views/demo/loading.vue')
    }
  ]
}

export default demo
