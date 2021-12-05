import { App } from 'vue'

export type WithInstall<T> = T & {
  install(app: App): void
}

export function withInstall<T>(options: T) {
  ;(options as Record<string, unknown>).install = (app: App) => {
    const { name } = options as unknown as { name: string }
    app.component(name, options)
  }

  return options as WithInstall<T>
}
