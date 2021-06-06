import { AxiosResponse } from 'axios'
import { isString, isUrl } from '../is'
import { HttpRequest } from './core/axios'
import { checkStatus } from './core/checkStatus'
import { AxiosInterceptor } from './core/interceptor'
import { refreshTokenRequest } from './core/refreshTokenRequest'
import { ContentType } from './enum'
import { HttpOptions } from './types'

const interceptor: AxiosInterceptor = {
  requestInterceptors: (config) => {
    if (typeof window !== 'undefined') {
      config.headers.Authorization = ''
    }

    let { params = {} } = config
    const url = config.url || ''
    const { apiUrl, joinTime } = config['requestOptions']

    if (joinTime) {
      params = Object.assign(params, { _t: new Date().getTime() })
    }

    if (!isUrl(url) && apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${url}`
    }

    if (isString(params)) {
      config.url = config.url + params
      config.params = undefined
      return config
    }

    if (config.method?.toUpperCase() === 'GET') {
      config.params = params
    } else {
      config.data = params
      config.params = undefined
    }

    return config
  },

  responseInterceptors: (res: AxiosResponse<any>) => {
    const { nativeResponse, transformResponse } = res.config['requestOptions'] || {}
    if (nativeResponse) {
      return res
    }
    if (!transformResponse) {
      return res.data
    }

    const { code, data } = res.data
    if (code === 401) {
      return refreshTokenRequest(res.config)
    }
    if (code === 0) {
      return data
    }
    return Promise.reject(res)
  },

  responseInterceptorsCatch: (error: any) => {
    const { response, code, message } = error || {}
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''

    if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      console.log('接口请求超时')
      return
    }
    if (err?.includes('Network Error')) {
      console.log('网络异常')
      return
    }

    checkStatus(error?.response?.status, msg)

    return Promise.reject(error)
  },
}

function createHttp(opt?: HttpOptions) {
  return new HttpRequest({
    timeout: 3 * 1000,
    // baseURL: '',
    headers: { 'Content-Type': ContentType.JSON },
    interceptor,
    requestOptions: {
      // apiUrl: 'http://api.xxx.dev',
      // joinPrefix: true,

      joinTime: true,

      loading: false,
      cancelRepeatRequest: false,
      retryTimes: 3,
      retryDelay: 300,
      cache: false,
      expire: 2 * 60 * 60 * 1000,

      nativeResponse: false,
      transformResponse: true,
    },
    ...opt,
  })
}

export const http = createHttp({})
