import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

export function isReport(): boolean {
  return process.env.REPORT === 'true'
}

export function getEnv(): string {
  return process.env.NODE_ENV || 'development'
}

export const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const viteEnv: Partial<ViteEnv> = {}

  for (const key of Object.keys(envConf)) {
    let realName = envConf[key].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (key === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'))
      } catch (error) {
        realName = ''
      }
    }

    viteEnv[key] = realName
    if (typeof realName === 'string') {
      process.env[key] = realName
    } else if (typeof realName === 'object') {
      process.env[key] = JSON.stringify(realName)
    }
  }
  return viteEnv as ViteEnv
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
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '')
}
