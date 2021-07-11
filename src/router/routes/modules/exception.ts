import { AppRouteModule } from '../../types'

const exception: AppRouteModule = {
  path: '/exception',
  name: 'ExceptionPage',
  meta: {
    title: '异常页面'
  },
  children: [
    {
      path: '/403',
      name: '403',
      component: () => import('/@/views/exception/403.vue'),
      meta: { title: '403' },
      props: {
        status: 403
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('/@/views/exception/404.vue'),
      meta: { title: '404' },
      props: {
        status: 404
      }
    },
    {
      path: '/500',
      name: '500',
      component: () => import('/@/views/exception/500.vue'),
      meta: { title: '500' },
      props: {
        status: 500
      }
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: () => import('/@/views/exception/network-error.vue'),
      meta: { title: '网络错误' },
      props: {
        status: 'NetworkError'
      }
    }
  ]
}

export default exception
