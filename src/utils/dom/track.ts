import qs from 'qs'
import { getCookie } from '../cache/cookie'
import { uuidv4 } from '../uuid'
let image: HTMLImageElement | null

type Params = { [key: string]: any }

interface StorageType {
  eventId: string
  data: Params
}

class TrackStorage {
  private static readonly STORAGE_KEY: string = 'track'

  public static addStorageEvent(eventId: string, data: Params) {
    const existEvents = this.getStorageEvents()
    this.setStorage(JSON.stringify(existEvents.push({ eventId, data })))
  }

  public static getStorageEvents() {
    const storage = localStorage.getItem(this.STORAGE_KEY)
    return (storage ? JSON.parse(storage) : []) as StorageType[]
  }

  public static removeStorageEvent(eventId: string) {
    const existEvents = this.getStorageEvents()
    this.setStorage(JSON.stringify(existEvents.filter((item) => item.eventId !== eventId)))
  }

  public static getTraceId() {
    try {
      const trackKey = 'trace_key'
      let trackId = localStorage.getItem(trackKey)
      if (!trackId) {
        trackId = uuidv4()
        localStorage.setItem(trackKey, trackId)
      }
      return trackId
    } catch (e) {
      return ''
    }
  }

  private static setStorage(value: string) {
    localStorage.setItem(this.STORAGE_KEY, value)
  }
}

export class BaseTrack {
  private static serverUrl = ''

  public static init() {
    if (window.addEventListener) {
      window.addEventListener('beforeunload', this.reportAllStorageEvent, false)
    } else if ((window as any).attachEvent) {
      ;(window as any).attachEvent('onbeforeunload', this.reportAllStorageEvent)
    }
  }

  public static track(eventId: string, params: Params, store = true) {
    try {
      const data = qs.stringify({
        timestamp: Date.now(),
        trackId: TrackStorage.getTraceId(),
        url: location.href,
        userId: getCookie('userId'),
        ...params
      })
      if (store) {
        const uniqueEventId = `${uuidv4()}_${eventId}`
        TrackStorage.addStorageEvent(uniqueEventId, params)
        this.reportByImg(uniqueEventId, data)
      } else {
        this.reportByImg(eventId, data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  private static reportByImg(uniqueEventId: string, qs: string, retryTimes = 3) {
    const eventId = uniqueEventId.split('_')[1]
    const retry = () => {
      image = null
      if (retryTimes > 0) {
        this.reportByImg(eventId, qs, retryTimes - 1)
      }
    }

    return new Promise((_resolve, _reject) => {
      try {
        image = new Image()
        image.onload = () => {
          TrackStorage.removeStorageEvent(uniqueEventId)
        }
        image.onerror = () => {
          retry()
        }
        image.src = this.serverUrl + qs + '&eventId=' + eventId
      } catch (e) {
        console.error(e)
      }
    })
  }

  private static reportAllStorageEvent() {
    const storageEvents = TrackStorage.getStorageEvents()
    storageEvents.forEach((item) => {
      this.track(item.eventId, item.data, false)
    })
  }
}
