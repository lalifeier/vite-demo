export function unique(arr: []) {
  return Array.from(new Set(arr))
}

export function uniqWith(arr: [], key: string) {
  const map = new Map()
  arr.forEach((item) => {
    if (!map.has(item[key])) {
      map.set(item[key], item)
    }
  })
  return [...map.values()]
}

export function compareAsc(x: any, y: any) {
  if (x < y) {
    return -1
  }
  if (x > y) {
    return 1
  }
  return 0
}

export function compareDesc(x: any, y: any) {
  if (x < y) {
    return 1
  }
  if (x > y) {
    return -1
  }
  return 0
}

export function compareWith(prop: any) {
  return function (obj1: any, obj2: any) {
    let val1 = obj1[prop]
    let val2 = obj2[prop]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return -1
    }
    if (val1 > val2) {
      return 1
    }
    return 0
  }
}

export function groupBy(arr: any[], key: string) {
  return arr.reduce((total, val) => {
    const value = val[key]
    total[value] = total[value] || []
    total[value].push(val)
    return total
  }, Object.create(null))
}

export function groupByWithSum(arr: any[], key: string, keys: []) {
  return arr.reduce((total: any[], val) => {
    const index = total.findIndex((obj) => obj[key] === val[key])
    if (index === -1) {
      total.push(val)
    } else {
      keys.forEach((key) => {
        total[index][key] += val[key]
      })
    }
    return total
  }, [])
}
