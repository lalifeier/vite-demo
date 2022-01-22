import { createTypes, toType } from 'vue-types'

export default class PropTypes extends createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  array: undefined,
  object: undefined,
  integer: undefined,
}) {
  static get style() {
    return toType('style', {
      type: [String, Object],
      default: undefined,
    })
  }
}
