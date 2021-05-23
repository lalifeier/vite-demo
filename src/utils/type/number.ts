export function paddingNumber(num: number, length: number): string {
  return (Array(length).join('0') + num).slice(-length)
}

export function formatNumber(number: number | string, decimals = 2, dec_point = '.', thousands_sep = ','): string {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep
  const dec = typeof dec_point === 'undefined' ? '.' : dec_point
  let s: any = []
  const toFixedFix = (n: number, prec: number) => {
    const k = Math.pow(10, prec)
    return '' + Math.round(n * k) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}
