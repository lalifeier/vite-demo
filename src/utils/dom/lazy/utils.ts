import { inBrowser } from '../../is'

export const hasIntersectionObserver = checkIntersectionObserver()

function checkIntersectionObserver() {
  if (
    inBrowser() &&
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  ) {
    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get: function () {
          return this.intersectionRatio > 0
        },
      })
    }
    return true
  }
  return false
}

const style = (el: HTMLElement, prop: string): string => {
  return getComputedStyle(el).getPropertyValue(prop)
}

const overflow = (el: HTMLElement): string => {
  return style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x')
}

export function scrollParent(el: HTMLElement): HTMLElement | Window {
  let parent = el

  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break
    }

    if (!parent.parentNode) {
      break
    }

    if (/(scroll|auto)/.test(overflow(parent))) {
      return parent
    }

    parent = parent.parentNode as HTMLElement
  }

  return window
}

export default function loadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = function () {
      resolve()
    }
    image.onerror = function (e) {
      reject(e)
    }
  })
}

export function isInViewport(el: Element, preLoad = 1) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) * preLoad &&
    rect.bottom > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) * preLoad &&
    rect.right > 0
  )
}
