import type { AppRouteRecordRaw } from '/@/router/types'

const modules = import.meta.globEager('./modules/**/*.ts')

const moduleRouters: AppRouteRecordRaw[] = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  moduleRouters.push(...modList)
})

const notFoundPageRouter: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'Not Found Page',
  meta: { title: '404' },
  redirect: '/404'
}

export const asyncRoutes: Array<AppRouteRecordRaw> = [notFoundPageRouter, ...moduleRouters]

export const constantRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '首页' },
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: 'Dashboard'
    },
    component: () => import('/@/views/dashboard/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('/@/views/login/index.vue')
  },
  // 页面重定向 必须保留
  {
    path: '/redirect/:path(.*)',
    name: 'redirect',
    hidden: true,
    component: {
      beforeRouteEnter(_to, from, next) {
        next((vm) => vm.$router.replace(JSON.parse(from.params.route)))
      }
    }
  },
  // 刷新页面 必须保留
  {
    path: '/refresh',
    name: 'refresh',
    hidden: true,
    component: {
      beforeRouteEnter(_to, from, next) {
        next((vm) => vm.$router.replace(from.fullPath))
      }
    }
  }
]
