export function hasClass(ele: Element, cls: string) {
  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export function addClass(ele: Element, cls: string) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

export function removeClass(ele: Element, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function scollPostion() {
  let t, l, w, h
  if (document.documentElement && document.documentElement.scrollTop) {
    t = document.documentElement.scrollTop
    l = document.documentElement.scrollLeft
    w = document.documentElement.scrollWidth
    h = document.documentElement.scrollHeight
  } else if (document.body) {
    t = document.body.scrollTop
    l = document.body.scrollLeft
    w = document.body.scrollWidth
    h = document.body.scrollHeight
  }
  return {
    top: t,
    left: l,
    width: w,
    height: h,
  }
}

export function isElementViewport(el: Element) {
  // if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0]

  const rect = el.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0

  return vertInView && horInView
}
