export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export const sum = (arr: number[]) => arr.reduce((acc, cur) => acc + cur, 0);

export const sumBy = <T>(arr: T[], fn: string | ((key: T) => number)) => {
  return arr.map(typeof fn === 'function' ? fn : (val) => val[fn]).reduce((acc, cur) => acc + cur, 0);
};

export function groupByWithSum(arr: any[], key: string, keys: []) {
  return arr.reduce((total: any[], val) => {
    const index = total.findIndex((obj) => obj[key] === val[key]);
    if (index === -1) {
      total.push(val);
    } else {
      keys.forEach((key) => {
        total[index][key] += val[key];
      });
    }
    return total;
  }, []);
}
