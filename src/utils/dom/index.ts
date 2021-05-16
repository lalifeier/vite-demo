export function hasClass(ele: Element, cls: string) {
  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export function addClass(ele: Element, cls: string) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

export function removeClass(ele: Element, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
