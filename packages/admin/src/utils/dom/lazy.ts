// const options = {
//     root: null,
//     rootMargin: "0px 0px 250px 0px",
//     thresholds: 0,
// }

function intersectionObserver(el: any, fn: Function, options?: any) {
  const ob = new IntersectionObserver((entries) => {
    if (entries.some(({ isIntersecting }) => isIntersecting)) {
      ob.disconnect()
      fn()
    }
  }, options)
  ob.observe(el)
}

function eventObserver(el: any, fn: Function) {
  let lazyloadThrottleTimeout: any
  const lazyload = () => {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout)
    }
    lazyloadThrottleTimeout = setTimeout(() => {
      const scrollTop = window.pageYOffset

      console.log(el)

      console.log(el.offsetTop, window.innerHeight + scrollTop)

      if (el.offsetTop < window.innerHeight + scrollTop) {
        fn()
      }
      if (document.querySelectorAll('img.data-lazyload').length === 0) {
        document.removeEventListener('scroll', lazyload)
        window.removeEventListener('resize', lazyload)
        window.removeEventListener('orientationChange', lazyload)
      }
    }, 20)
  }

  lazyload()

  document.addEventListener('scroll', lazyload)
  window.addEventListener('resize', lazyload)
  window.addEventListener('orientationChange', lazyload)
}

export function lazyInit(el: any, fn: Function, options?: any) {
  if ('IntersectionObserver' in window) {
    intersectionObserver(el, fn, options)
  } else {
    eventObserver(el, fn)
  }
}

// <img  data-src="" class="data-lazyload">
export function lazyLoadImage() {
  document.querySelectorAll('img.data-lazyload').forEach((img: any) => {
    lazyInit(img, () => {
      img.src = img.dataset.src
      img.classList.remove('data-lazyload')
    })
  })
}

// document.addEventListener('DOMContentLoaded', () => {
//   lazyLoadImage()
// })
