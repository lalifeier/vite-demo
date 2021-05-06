import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.globEager('./modules/**/*.ts')

const moduleRouters: RouteRecordRaw[] = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  moduleRouters.push(...modList)
})

export const asyncRoutes: Array<RouteRecordRaw> = moduleRouters

export const constantRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   redirect: '/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'index',
  //       meta: { title: '首页'},
  //       component: () => import('../../views/index/index.vue'),
  //     },
  //   ],
  // },

  {
    path: '/',
    name: 'Home',
    meta: { title: '首页' },
    redirect: 'index',
  },
  {
    path: '/index',
    name: 'index',
    meta: { title: '首页' },
    component: () => import('/@/views/index/index.vue'),
  },
  {
    path: '/composition',
    name: 'composition',
    meta: { title: '首页' },
    component: () => import('/@/views/composition/index.vue'),
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   hidden: true,
  //   component: () => import('@/views/login/index.vue'),
  // },
]
