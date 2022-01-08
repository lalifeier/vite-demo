import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export function isReport(): boolean {
  return process.env.REPORT === 'true';
}

export function getEnv(): string {
  return process.env.NODE_ENV || 'development';
}

export function wrapperEnv(env: Recordable): ViteEnv {
  const ret: any = {};

  for (const key in env) {
    let value = env[key];
    if (value === 'true') {
      value = true;
    }
    if (value === 'false') {
      value = false;
    }
    if (key === 'VITE_PORT') {
      value = Number(value);
    }
    if (key === 'VITE_PROXY') {
      try {
        value = JSON.parse(value);
      } catch (error) {
        value = '';
      }
    }
    ret[key] = value;
    if (typeof value === 'string') {
      process.env[key] = value;
    } else if (typeof value === 'object') {
      process.env[key] = JSON.stringify(value);
    }
  }
  return ret;
}

function getConfFiles() {
  const script = process.env.npm_lifecycle_script;
  const reg = new RegExp('--mode ([a-z_\\d]+)');
  const result = reg.exec(script as string) as any;
  if (result) {
    const mode = result[1] as string;
    return ['.env', `.env.${mode}`];
  }
  return ['.env', '.env.production'];
}

export function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig = {};
  confFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`Error in parsing ${item}`, e);
    }
  });
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}

export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '');
};
