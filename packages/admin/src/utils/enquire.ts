import enquireJs from 'enquire.js'

const mobileQuery = 'only screen and (max-width: 767.99px)'

export function enquireScreen(cb, query = mobileQuery) {
  const handler = {
    match: () => {
      cb && cb(true)
    },
    unmatch: () => {
      cb && cb(false)
    },
  }

  enquireJs.register(query, handler)
  return handler
}

export function unenquireScreen(handler, query = mobileQuery) {
  enquireJs.unregister(query, handler)
}
