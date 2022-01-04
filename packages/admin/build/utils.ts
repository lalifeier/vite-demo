import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import type { ProxyOptions } from 'vite'
import pkg from '../package.json'

export function isReport(): boolean {
  return process.env.REPORT === 'true'
}

export function getEnv(): string {
  return process.env.NODE_ENV || 'development'
}

export const release = `${pkg.name}@${pkg.version}`

export const project = pkg.name

export function wrapperEnv(env: Recordable): ViteEnv {
  const ret: any = {}

  for (const key in env) {
    let value = env[key]
    if (value === 'true') {
      value = true
    }
    if (value === 'false') {
      value = false
    }
    if (key === 'VITE_PORT') {
      value = Number(value)
    }
    if (key === 'VITE_PROXY') {
      try {
        value = JSON.parse(value)
      } catch (error) {}
    }
    ret[key] = value
    process.env[key] = value
  }
  return ret
}

export function createProxy(list: [string, string][] = []) {
  const ret: Record<string, ProxyOptions> = {}
  for (const [prefix, target] of list) {
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      secure: /^https:\/\//.test(target)
    }
  }
  return ret
}

function getConfFiles() {
  const script = process.env.npm_lifecycle_script
  const reg = new RegExp('--mode ([a-z_\\d]+)')
  const result = reg.exec(script as string) as any
  if (result) {
    const mode = result[1] as string
    return ['.env', `.env.${mode}`]
  }
  return ['.env', '.env.production']
}

export function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig = {}
  confFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)))
      envConfig = { ...envConfig, ...env }
    } catch (e) {
      console.error(`Error in parsing ${item}`, e)
    }
  })
  const reg = new RegExp(`^(${match})`)
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })
  return envConfig
}

export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}

export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '')
}
