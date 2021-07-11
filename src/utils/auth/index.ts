import { local } from '../cache'

export function getToken(key) {
  local.get(key)
}

export function removeToken() {}
