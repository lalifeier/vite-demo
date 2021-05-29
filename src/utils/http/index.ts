import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { isString, isUrl } from '../is'
import { cacheAdapterEnhancer } from './adapters/cache'
import { retryAdapterEnhancer } from './adapters/retry'
import { Request } from './core/axios'
import { AxiosInterceptor } from './core/interceptor'
import { AxiosTransform } from './core/transform'
import { ContentType } from './emum'
import { HttpOptions, Result } from './types'

const interceptor: AxiosInterceptor = {
  requestInterceptors: (config) => {
    // if (store.getters.access_token) {
    //   config.headers.Authorization = cookies.get(ACCESS_TOKEN)
    // }
    return config
  },

  responseInterceptorsCatch: (error) => {
    return Promise.reject(error)
  },
}

const transform: AxiosTransform = {
  transformRequest: (config, options) => {
    const { url = '', params = {} } = config
    const { apiUrl } = options

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

  transformResponse(res: AxiosResponse<Result>) {
    const { data } = res.data
    return data
  },
}

function createHttp(opt?: HttpOptions) {
  return new Request({
    timeout: 3 * 1000,
    // baseURL: '',
    headers: { 'Content-Type': ContentType.JSON },
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
    transform,
    interceptor,
    requestOptions: {
      apiUrl: 'http://api.xxx.dev',
      joinPrefix: true,
      ignoreCancel: false,
    },
    ...opt,
  })
}

export const http = createHttp({})
