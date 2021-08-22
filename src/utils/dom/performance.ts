import type { Router } from 'vue-router'

export class Performance {
  public static readonly timing = window.performance && window.performance.timing

  private static fpt = 0

  public static init() {
    if (!this.timing) {
      console.warn('当前浏览器不支持Performance APT')
      return
    }

    window.addEventListener('load', () => {
      // BaseTrack.track(this.getTimings())
    })
  }

  public static getTimings() {
    if (!this.timing) {
      console.warn('当前浏览器不支持Performance APT')
      return {}
    }
    return {
      redirect: this.getRedirectTiming(),
      dns: this.getDnsTiming(),
      tcp: this.getTcpTiming(),
      ttfb: this.getTimeOfFirstByte(),
      req: this.getRequestTime(),
      ppdt: this.getParsePureDomTime(),
      dclt: this.getDomContentLoadTime(),
      fpt: this.getFirstPaintTime(),
      load: this.getLoadTime()
    }
  }

  public static record(router?: Router) {
    const setFPT = () => {
      if (window.performance && window.performance.timing) {
        this.fpt = window.performance.now()
      }
    }

    return {
      created: () => {
        if (router) {
          router.isReady().then(() => {
            setFPT()
          })
        } else {
          setFPT()
        }
      }
    }
  }

  // 重定向耗时
  private static getRedirectTiming() {
    return this.timing.redirectEnd - this.timing.redirectStart
  }

  // DNS解析耗时
  private static getDnsTiming() {
    return this.timing.domainLookupEnd - this.timing.domainLookupStart
  }

  private static getTcpTiming() {
    return this.timing.connectEnd - this.timing.connectStart
  }

  // 读取页面第一个字节时间
  private static getTimeOfFirstByte() {
    return this.timing.responseStart - this.timing.navigationStart
  }

  // request请求耗时
  private static getRequestTime() {
    return this.timing.responseEnd - this.timing.responseStart
  }

  // 解析纯dom树耗时（不包含js css等外链资源的加载与执行）
  private static getParsePureDomTime() {
    return this.timing.domInteractive - this.timing.domLoading
  }

  // 页面资源加载耗时
  private static getDomContentLoadTime() {
    return this.timing.domComplete - this.timing.domInteractive
  }

  // 页面load总耗时
  private static getLoadTime() {
    return this.timing.loadEventStart - this.timing.navigationStart
  }

  private static getFirstPaintTime() {
    return Math.round(
      (window.performance.getEntriesByName &&
        window.performance.getEntriesByName('first-paint') &&
        window.performance.getEntriesByName('first-paint')[0] &&
        window.performance.getEntriesByName('first-paint')[0].startTime) ||
        this.fpt
    )
  }
}
