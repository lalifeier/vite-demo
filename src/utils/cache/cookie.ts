export function getCookie(name: string) {
  if (document) {
    const list = document.cookie.match(
      new RegExp('(?:^| )' + encodeURIComponent(name) + '=([^;]+)')
    )
    return list && decodeURIComponent(list[1])
  } else {
    return ''
  }
}

export class Cookie {
  set(key: string, value: any, attributes) {
    attributes = Object.assign({}, attributes)

    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5)
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString()
    }

    let stringifiedAttributes = ''
    for (const attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName
      if (attributes[attributeName] === true) {
        continue
      }

      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0]
    }
    document.cookie = key + '=' + value + stringifiedAttributes
  }

  get(key: string) {
    if (typeof document === 'undefined') {
      return ''
    }
    const arr = document.cookie.match(new RegExp('(?:^| )' + encodeURIComponent(key) + '=([^;]+)'))
    return arr && decodeURIComponent(arr[1])
  }

  remove(key: string) {
    this.set(key, '', {
      expires: -1
    })
  }

  clear() {}
}

export const cookie = new Cookie()
