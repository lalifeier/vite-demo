export function treeToFlat<T = any>(data: any): T {
  let result: any = []
  for (const item of data) {
    const { children, ...i } = item
    if (children && children.length > 0) {
      result = result.concat(treeToFlat(children))
    }
    result.push(i)
  }
  return result
}

export function listToTree<T = any>(data: any[]): T[] {
  const result: T[] = []
  const getChildren = (data, id) => {
    const children: T[] = []
    for (const item of data) {
      if (item.pid === id) {
        children.push({ ...item, children: getChildren(data, item.id) })
      }
    }
    return children
  }
  for (const item of data) {
    if (!item['pid']) {
      result.push({ ...item, children: getChildren(data, item.id) })
    }
  }
  return result
}

// function flatToTree<T = any>(data: any[]): T[] {
//   const getChildren = (data, pid = 0) => {
//     const result: T[] = []
//     for (const item of data) {
//       if (item.pid === pid) {
//         result.push({ ...item, children: getChildren(data, item.id) })
//       }
//     }
//     return result
//   }
//   return getChildren(data)
// }

export function flatToTree<T = any>(data: any[], { idKey = 'id', pidkey = 'pid' }): T[] {
  const result: T[] = []
  const map = {}

  for (const item of data) {
    const { [idKey]: id } = item
    map[id] = { ...item, children: map[id]?.children || [] }
  }

  for (const item of data) {
    const { [idKey]: id, [pidkey]: pid } = item

    const parent = map[pid]
    ;(parent ? parent.children : result).push(map[id])
  }
  return result
}
