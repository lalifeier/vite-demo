export const fillArray = (n: number, val: any = 0) => Array(n).fill(val);

export function unique(arr: []) {
  return Array.from(new Set(arr));
}

export function uniqueWith<T>(arr: T[], key: string) {
  const map = new Map();
  arr.forEach((item) => {
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });
  return [...map.values()];
}

export const uniqueBy = <T>(arr: T[], fn: string | ((a: T, b: T) => boolean)) => {
  return arr.reduce((acc: T[], cur: T) => {
    const isHas = acc.some((item) => {
      return typeof fn === 'function' ? fn(cur, item) : cur[fn] === item[fn];
    });
    if (!isHas) acc.push(cur);
    return acc;
  }, []);
};

export const uniqueByWith = <T>(arr: T[], fn: string | ((key: T) => boolean)) => {
  return arr.map(typeof fn === 'function' ? fn : (val) => val[fn]).reduce((acc, cur) => acc + cur, 0);
};

export function compareAsc(x: any, y: any) {
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
}

export function compareDesc(x: any, y: any) {
  if (x < y) {
    return 1;
  }
  if (x > y) {
    return -1;
  }
  return 0;
}

export function compareWith(prop: any) {
  return function (obj1: any, obj2: any) {
    let val1 = obj1[prop];
    let val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      return -1;
    }
    if (val1 > val2) {
      return 1;
    }
    return 0;
  };
}

export function groupBy<T>(arr: T[], fn: Function | string) {
  return arr.reduce((arr, cur) => {
    const key = typeof fn === 'function' ? fn(cur) : cur[fn];
    arr[key] = arr[key] || [];
    arr[key].push(cur);
    return arr;
  }, Object.create(null));
}
