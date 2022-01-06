import { GlobEnvConfig } from '#/config';
import { getConfigFileName } from '../../build/utils';
import pkg from '../../package.json';
import { Logger } from './logger';

export const DEV = 'development';
export const PROD = 'production';

export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;

export function getEnv(): string {
  return import.meta.env.MODE;
}

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  const ENV = isDev
    ? (import.meta.env as unknown as GlobEnvConfig)
    : (window[ENV_NAME as any] as unknown as GlobEnvConfig);

  const { VITE_GLOB_APP_TITLE, VITE_GLOB_APP_SHORT_NAME, VITE_GLOB_API_URL, VITE_GLOB_UPLOAD_URL } = ENV;

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    Logger.warn(
      'env',
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL,
    VITE_GLOB_UPLOAD_URL,
  };
}

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}
