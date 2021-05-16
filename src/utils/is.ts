export function isEmpty(data) {
  const type = typeOf(data)
  switch (type) {
    case 'array':
      return data.length === 0
    case 'object':
      // return JSON.stringify(data) === '{}';
      return Object.keys(data).length === 0
    case 'number':
      return false
    default:
      return !data
  }
}
