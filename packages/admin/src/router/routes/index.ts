import type { AppRouteRecordRaw } from '@/router/types'
import { LAYOUT, REDIRECT_NAME } from './constant'

const modules = import.meta.globEager('./modules/**/*.ts')

const moduleRouters: AppRouteRecordRaw[] = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  moduleRouters.push(...modList)
})

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'Not Found Page',
  meta: { title: 'Not Found Page', hideMenu: true },
  redirect: '/exception/404',
}

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
      },
    },
  ],
}

export const asyncRoutes: Array<AppRouteRecordRaw> = [...moduleRouters, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE]

export const constantRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '首页' },
    redirect: '/dashboard',
  },
]
