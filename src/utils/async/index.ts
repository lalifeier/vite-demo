export function asyncPool(poolLimit: number, array: [], iteratorFn: Function) {
  let i = 0
  const ret = []
  const executing = []
  const enqueue = function () {
    if (i === array.length) {
      return Promise.resolve()
    }
    const item = array[i++]
    const p = Promise.resolve().then(() => iteratorFn(item, array))
    ret.push(p)

    let r = Promise.resolve()

    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= poolLimit) {
        r = Promise.race(executing)
      }
    }

    return r.then(() => enqueue())
  }
  return enqueue().then(() => Promise.all(ret))
}
