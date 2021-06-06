export function checkStatus(status: number, msg?: string): void {
  console.log(msg)

  switch (status) {
    case 401:
      console.log('没有权限')
      break
    case 403:
      console.log('禁止访问')
      break
    case 404:
      console.log('未找到该资源')
      break
    case 500:
      console.log('服务器错误')
      break
    default:
  }
}
