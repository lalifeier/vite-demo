import { debounce } from 'lodash-es';

let loading;
let needLoadingRequestCount = 0;

export function showLoading() {
  if (needLoadingRequestCount === 0 && !loading) {
  }
  needLoadingRequestCount++;
}

const hideLoading = debounce(() => {
  if (loading !== null) {
    loading.close();
  }
  loading = null;
}, 300);

export function closeLoading() {
  needLoadingRequestCount--;
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0);
  if (needLoadingRequestCount === 0) {
    hideLoading();
  }
}
