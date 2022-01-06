import { DEFAULT_EXPIRE_TIME } from '@/settings/cache';
import { getStorageShortName } from '@/utils//env';
import { createWebStorage, WebStorageOption } from './storage';

export type Options = Partial<WebStorageOption>;

const createOptions = (storage: Storage, option: Options = {}): WebStorageOption => {
  return {
    storage,
    prefixKey: getStorageShortName(),
    timeout: DEFAULT_EXPIRE_TIME,
    ...option,
  };
};

export const createSessionStorage = (opt: Options = {}) => {
  return createWebStorage(createOptions(sessionStorage, opt));
};

export const createLocalStorage = (opt: Options = {}) => {
  return createWebStorage(createOptions(localStorage, opt));
};

export const _sessionStorage = createSessionStorage();
export const _localStorage = createLocalStorage();

export const clearWebStorage = () => {
  _localStorage.clear();
  _sessionStorage.clear();
};
