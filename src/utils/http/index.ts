import { timeout } from '@/config'
import router from '@/router'
import store from '@/store'
import { ACCESS_TOKEN } from '@/utils/constants'
import cookies from '@/utils/cookies'
import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import { cacheAdapterEnhancer } from './cache'
import { addPendingRequest, removePendingRequest } from './cancel'
import { showFullScreenLoading, tryHideFullScreenLoading } from './full-screen-loading'
import { retryAdapterEnhancer } from './retry'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout,
  showLoading: true,

  headers: { 'Cache-Control': 'no-cache' },
  adapter: retryAdapterEnhancer(
    cacheAdapterEnhancer(axios.defaults.adapter, {
      enabledByDefault: false,
      cacheFlag: 'cache',
      maxAge: 5000,
    }),
    {
      times: 4,
      delay: 300,
    }
  ),
})

const isRefreshing = false
const requests = []
function refreshToken(isRefreshing, requests, config) {
  if (!isRefreshing) {
    isRefreshing = true
    return store
      .dispatch('user/refreshToken')
      .then((access_token) => {
        config.headers.Authorization = access_token
        config.baseURL = ''
        requests.forEach((cb) => cb(access_token))
        requests = []
        return axios(config)
      })
      .catch((err) => {
        return Promise.reject(new Error(err.message))
      })
      .finally(() => {
        isRefreshing = false
      })
  }
  return new Promise((resolve) => {
    requests.push((token) => {
      config.baseURL = ''
      config.headers.Authorization = token
      resolve(axios(config))
    })
  })
}

service.interceptors.request.use(
  (config) => {
    if (config.showLoading) {
      showFullScreenLoading(config.loadingTarget)
    }
    if (store.getters.access_token) {
      config.headers.Authorization = cookies.get(ACCESS_TOKEN)
    }

    removePendingRequest(config)
    addPendingRequest(config)

    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.config.showLoading) {
      tryHideFullScreenLoading()
    }
    removePendingRequest(response.config)

    if (response.headers.refresh_token) {
      const { config } = response
      return refreshToken(isRefreshing, requests, config)
    }

    const res = response.data
    const { code, message } = res
    if (code === 200) {
      return res
    }
    switch (code) {
      case 401:
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
        break
      case 403:
        router.push({ path: '/403' })
        break
      default:
        Message({
          message: message || '请求出错',
          type: 'error',
        })
        break
    }
    return Promise.reject(new Error(message || 'Error'))
  },
  (error) => {
    if (error.config.showLoading) {
      tryHideFullScreenLoading()
    }
    removePendingRequest(error.config)

    if (axios.isCancel(error)) {
      console.log(`已取消的重复请求：${error.message}`)
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
      })
      console.log(error)
      return Promise.reject(error)
    }
  }
)

export default service

export function requestPost(url, data) {
  return service({
    url,
    method: 'post',
    transformRequest: [
      (data) => {
        data = qs.stringify(data)
        return data
      },
    ],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data,
  })
}

export function requestPostFormData(url, data) {
  return service({
    url,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  })
}

export function requestGetDownloadProcess(url, data, downloadProcess) {
  return service({
    timeout: 10000 * 60, // 请求超时时间
    url,
    method: 'get',
    params: data,
    headers: { 'Content-Type': 'application/octet-stream;charset=utf-8' },
    responseType: 'arraybuffer',
    onDownloadProgress: downloadProcess,
  })
}
