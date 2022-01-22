export function hasOwnProperty<T>(obj: T, v: PropertyKey) {
  if (obj == null) return false
  return Object.prototype.hasOwnProperty.call(obj, v)
}

export function clearUndefined<T extends object>(obj: T): T {
  Object.keys(obj).forEach((key: string) => (obj[key] === undefined ? delete obj[key] : {}))
  return obj
}
