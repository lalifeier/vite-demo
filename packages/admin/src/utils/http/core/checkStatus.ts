// const codeMessage: Record<string, string> = {
//   400: '请求错误',
//   401: '登录状态失效，请重新登录',
//   403: '拒绝访问',
//   404: '请求地址不存在',
//   500: '服务器繁忙',
//   502: '网关错误',
//   503: '服务不可用，服务器暂时过载或维护',
//   504: '网关超时'
// }

export function checkStatus(status: number, msg?: string): void {
  console.log(msg);

  switch (status) {
    case 400:
      console.log('客户端出错');
      break;
    case 401:
      console.log('认证失败');
      break;
    case 403:
      console.log('授权失败');
      break;
    case 404:
      console.log('未找到该资源');
      break;
    case 405:
      console.log('请求方法不被允许');
      break;
    case 408:
      console.log('请求超时');
      break;
    case 422:
      console.log('请求格式错误');
      break;
    case 429:
      console.log('请求频繁');
      break;
    case 500:
      console.log('服务端出错');
      break;
    default:
  }
}
