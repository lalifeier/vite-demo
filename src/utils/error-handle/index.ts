import { App } from 'vue'
import { useErrorStore } from '/@/store/modules/error'

function setUpVueErrorHandler(app: App): void {
  app.config.errorHandler = (err: any, vm: any): void => {
    const { name, path } = formatComponentName(vm)

    const errorStore = useErrorStore()
    errorStore.addError({
      type: 'vue',
      name,
      file: path,
      stack: processStackMsg(err),
      message: err.message
    })
  }
}

function formatComponentName(vm: any) {
  if (vm.$root === vm) {
    return {
      name: 'root',
      path: 'root'
    }
  }

  const options = vm.$options as any
  if (!options) {
    return {
      name: 'anonymous',
      path: 'anonymous'
    }
  }
  const name = options.name || options._componentTag
  return {
    name: name,
    path: options.__file
  }
}

function processStackMsg(error: Error) {
  if (!error.stack) {
    return ''
  }
  let stack = error.stack
    .replace(/\n/gi, '') // Remove line breaks to save the size of the transmitted content
    .replace(/\bat\b/gi, '@') // At in chrome, @ in ff
    .split('@') // Split information with @
    .slice(0, 9) // The maximum stack length (Error.stackTraceLimit = 10), so only take the first 10
    .map((v) => v.replace(/^\s*|\s*$/g, '')) // Remove extra spaces
    .join('~') // Manually add separators for later display
    .replace(/\?[^:]+/gi, '') // Remove redundant parameters of js file links (?x=1 and the like)
  const msg = error.toString()
  if (stack.indexOf(msg) < 0) {
    stack = msg + '@' + stack
  }
  return stack
}

function setupScriptErrorHandler() {
  window.onerror = (
    event: Event | string,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ) => {
    if (event === 'Script error.' && !source) {
      return false
    }
    const name = source ? source.substr(source.lastIndexOf('/') + 1) : 'script'
    const errorStore = useErrorStore()
    errorStore.addError({
      type: 'script',
      name,
      file: source,
      detail: JSON.stringify({
        lineno,
        colno
      }),
      stack: error?.stack,
      message: event
    })
  }
}

function setupPromiseErrorHandler() {
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const errorStore = useErrorStore()
      errorStore.addError({
        type: 'promise',
        name: 'Promise Error',
        file: '',
        detail: '',
        stack: '',
        message: event.reason
      })
    },
    true
  )
}

function setupResourceErrorHandle() {
  window.addEventListener(
    'error',
    (event) => {
      const target = event.target ? event.target : (event.srcElement as any)
      const errorStore = useErrorStore()
      errorStore.addError({
        type: event.type,
        name: 'Resource Error',
        file: (event.target || ({} as any)).currentSrc,
        detail: JSON.stringify({
          tagName: target.localName,
          html: target.outerHTML,
          type: event.type
        }),
        stack: '',
        message: (event.target || ({} as any)).localName + ' is load error'
      })
    },
    true
  )
}

export function setupErrorHandle(app: App) {
  setUpVueErrorHandler(app)

  setupScriptErrorHandler()

  setupPromiseErrorHandler()

  setupResourceErrorHandle()
}
