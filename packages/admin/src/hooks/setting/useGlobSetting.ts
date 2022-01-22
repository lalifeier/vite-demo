import type { GlobConfig } from '#/config'
import { getAppEnvConfig } from '@/utils/env'
import { Logger } from '@/utils/logger'

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_APP_SHORT_NAME, VITE_GLOB_API_URL, VITE_GLOB_UPLOAD_URL } = getAppEnvConfig()

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    Logger.warn(
      'env',
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    )
  }

  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    apiUrl: VITE_GLOB_API_URL,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
  }
  return glob as Readonly<GlobConfig>
}
