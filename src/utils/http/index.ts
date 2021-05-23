import { Request } from './axios'
import { ContentType } from './emum'

function createHttp(opt?: any) {
  return new Request({
    timeout: 10 * 1000,
    headers: { 'Content-Type': ContentType.JSON },
    ...opt,
  })
}

export const http = createHttp()
