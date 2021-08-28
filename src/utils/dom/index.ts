import { easeInOutCubic } from './animation'

export const on = function (
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

export const off = function (
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture)
  }
}

export const once = function (el: HTMLElement, event: string, fn: EventListener): void {
  const listener = function (this, ...args: unknown[]) {
    if (fn) {
      fn.apply(this, args)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

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

export function toggleClass(ele: Element, cls: string, flag: boolean) {
  if (flag) {
    addClass(ele, cls)
  } else {
    removeClass(ele, cls)
  }
}

export function getViewportOffset() {
  return {
    w: getWindowWidth(),
    h: getWindowHeight()
  }
}

export function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

export function isElementViewport(el: Element) {
  const rect = el.getBoundingClientRect()
  const windowHeight = getWindowWidth()
  const windowWidth = getWindowHeight()

  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0

  return vertInView && horInView
}

export function getWindowWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

export function getWindowHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

export function getXPath(element) {
  // 如果元素有id属性,直接返回//*[@id="xPath"]
  if (element.id) {
    return '//*[@id="' + element.id + '"]'
  }
  // 向上查找到body,结束查找, 返回结果
  if (element == document.body) {
    return '/html/' + element.tagName.toLowerCase()
  }
  // 默认第一个元素的索引为1
  let currentIndex = 1
  const siblings = element.parentNode.childNodes
  for (const sibling of siblings) {
    if (sibling == element) {
      // 确定了当前元素在兄弟节点中的索引后, 向上查找
      return (
        getXPath(element.parentNode) +
        '/' +
        element.tagName.toLowerCase() +
        '[' +
        currentIndex +
        ']'
      )
    } else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) {
      // 继续寻找当前元素在兄弟节点中的索引
      currentIndex++
    }
  }
}

// export function getOffset(event) {
//   const rect = getBoundingClientRect(event.target)
//   if (rect.width == 0 || rect.height == 0) {
//     return
//   }
//   let doc = document.documentElement || document.body.parentNode
//   const scrollX = doc.scrollLeft
//   const scrollY = doc.scrollTop
//   const pageX = event.pageX || event.clientX + scrollX
//   const pageY = event.pageY || event.clientY + scrollY

//   const data = {
//     offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(4),
//     offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(4),
//   }

//   return data
// }

// window.addEventListener("click", function(event){
//   let e = window.event || event;
//   let target = e.srcElement || e.target;
// }, false);

// window.addEventListener(
//   'click',
//   function (event) {
//     const e = window.event || event
//     const target = e.srcElement || e.target
//     const xPath = getXPath(target)
//     const offsetData = getOffset(event)

//     report({ xPath, ...offsetData })
//   },
//   false
// )

export function scrollToTop(el) {
  const beginTime = Date.now()
  const beginValue = el.scrollTop
  const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16))
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / 500
    if (progress < 1) {
      el.scrollTop = beginValue * (1 - easeInOutCubic(progress))
      rAF(frameFunc)
    } else {
      el.scrollTop = 0
    }
  }
  rAF(frameFunc)
}
