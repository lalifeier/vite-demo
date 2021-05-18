import { Loading } from 'element-ui'
import _ from 'lodash'

import { loadingText } from '@/config'

let loading
let needLoadingRequestCount = 0

export function showFullScreenLoading(target) {
  if (needLoadingRequestCount === 0 && !loading) {
    loading = Loading.service({
      lock: true,
      text: loadingText,
      background: 'rgba(255, 255, 255, 0.5)',
      target: target || 'body',
    })
  }
  needLoadingRequestCount++
}

const toHideLoading = _.debounce(() => {
  if (loading !== null) {
    loading.close()
  }
  loading = null
}, 300)

export function tryHideFullScreenLoading() {
  needLoadingRequestCount--
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0)
  if (needLoadingRequestCount === 0) {
    toHideLoading()
  }
}
