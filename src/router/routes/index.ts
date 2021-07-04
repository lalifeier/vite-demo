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
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/demo/table',
    name: 'table',
    component: () => import('/@/views/demo/table.vue'),
  },
  {
    path: '/demo/lazy',
    name: 'lazy',
    component: () => import('/@/views/demo/lazy.vue'),
  },
  {
    path: '/demo/lazyScroll',
    name: 'lazyScroll',
    component: () => import('/@/views/demo/lazyScroll.vue'),
  },
  {
    path: '/demo/virtualScroll',
    name: 'virtualScroll',
    component: () => import('/@/views/demo/virtualScroll.vue'),
  },
]
