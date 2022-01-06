export function is(val: unknown, type: string) {
  const { toString } = Object.prototype;
  return toString.call(val) === `[object ${type}]`;
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

export function inBrowser() {
  return typeof window !== 'undefined' && window !== null;
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName;
}

export function validURL(str: string): boolean {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}

export function isUrl(url: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(url);
}

export function isPrimitive(val: any): boolean {
  return typeof val === 'object' ? val === null : typeof val !== 'function';
}

export function isValidKey(key: any): boolean {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

export function isIE11(): boolean {
  return !!window.MSInputMethodContext && !!document.documentMode;
}

export function isIE(): boolean {
  return !isNaN(Number(document.documentMode));
}

export function isEdge() {
  return navigator.userAgent.indexOf('Edge') > -1;
}

export function isFirefox() {
  return !!window.navigator.userAgent.match(/firefox/i);
}

export function isMobile() {
  return /Android|webOS|i?Phone|iPad|iPod|BlackBerry|Mobile/i.test(navigator.userAgent);
}

export const isIOS = (): boolean => /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());

export function isISOString(val) {
  const d = new Date(val);
  return !Number.isNaN(d.valueOf()) && d.toISOString() === val;
}

export const isSupportsIntersection = isClient && 'IntersectionObserver' in window;

export const isSupportsTouch = isClient && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0);

export const isNil = (value: any) => value === null || value === undefined;

export const isImg = (path: string): boolean => /\w.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)$/i.test(path);

export function isPhone(value: string): boolean {
  value = value.replace(/[^-|\d]/g, '');
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}

export function isKorean(text: string): boolean {
  return /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(text);
}

export const isNumeric = (value): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};
