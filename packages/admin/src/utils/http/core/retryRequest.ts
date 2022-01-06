export function retryRequest(axios, err) {
  const { config = {} } = err || {};
  const { requestOptions } = config;

  if (!requestOptions || !requestOptions.retryTimes) return Promise.reject(err);
  const { __retryCount = 0, retryDelay = 300, retryTimes } = requestOptions;

  console.log('重试请求：', __retryCount, retryTimes);

  requestOptions.__retryCount = __retryCount;
  if (__retryCount >= retryTimes) {
    return Promise.reject(err);
  }
  requestOptions.__retryCount++;
  const delay = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, retryDelay);
  });
  return delay.then(() => {
    return axios(config);
  });
}
