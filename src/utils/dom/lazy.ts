export function lazyInit(el: Element, fn: Function, options?: any) {
  if ('IntersectionObserver' in window) {
    // const options = {
    //     root: null,
    //     rootMargin: "0px 0px 250px 0px",
    //     thresholds: 0,
    // }
    const ob = new IntersectionObserver((entries) => {
      if (entries.some(({ isIntersecting }) => isIntersecting)) {
        ob.disconnect()
        fn()
      }
    }, options)
    ob.observe(el)
  } else {
    let lazyloadThrottleTimeout: any
    const lazyload = () => {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout)
      }
      lazyloadThrottleTimeout = setTimeout(() => {
        if (el.offsetTop < window.innerHeight + window.pageYOffset) {
          fn()
        }
        if (document.querySelectorAll('img[data-lazyload]').length === 0) {
          document.removeEventListener('scroll', lazyload)
          window.removeEventListener('resize', lazyload)
          window.removeEventListener('orientationChange', lazyload)
        }
      }, 20)
    }
    document.addEventListener('scroll', lazyload)
    window.addEventListener('resize', lazyload)
    window.addEventListener('orientationChange', lazyload)
  }
}

// <img  data-src="" class="data-lazyload">
export function lazyLoadImage() {
  document.querySelectorAll('img[data-lazyload]').forEach((img) => {
    lazyInit(img, () => {
      img.src = img.dataset.src
      img.classList.remove('data-lazyload')
    })
  })
}
