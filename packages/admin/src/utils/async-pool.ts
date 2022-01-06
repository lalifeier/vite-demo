// export function asyncPool(poolLimit: number, array: any[], iteratorFn: Function) {
//   let i = 0
//   const ret: Promise<void>[] = []
//   const executing: Function[] = []
//   const enqueue: Function = function () {
//     if (i === array.length) {
//       return Promise.resolve()
//     }
//     const item = array[i++]
//     const p = Promise.resolve().then(() => iteratorFn(item, array))
//     ret.push(p)

//     let r: any = Promise.resolve()

//     if (poolLimit <= array.length) {
//       const e = p.then(() => executing.splice(executing.indexOf(e), 1))
//       executing.push(e)
//       if (executing.length >= poolLimit) {
//         r = Promise.race(executing)
//       }
//     }

//     return r.then(() => enqueue())
//   }
//   return enqueue().then(() => Promise.all(ret))
// }

export async function asyncPool(poolLimit: number, array: any[], iteratorFn: Function) {
  const ret: Promise<void>[] = [];
  const executing: Function[] = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p);
    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}
