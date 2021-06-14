export interface LazyOptions {
  loading: string
  error: string
  observerOptions?: IntersectionObserverInit
  throttleDelay?: number
  preLoad?: number
  listenEvents: string[]
  attempt?: number
}

export interface ListenerOptions {
  el: HTMLElement
  parent: HTMLElement | Window
  src: string
  loading: string
  error: string
}

export interface Target {
  el: HTMLElement | Window
  ref: number
}
