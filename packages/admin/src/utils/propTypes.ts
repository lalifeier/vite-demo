import { createTypes, toType } from 'vue-types';

export default class PropTypes extends createTypes() {
  static get style() {
    return toType('style', {
      type: [String, Object],
      default: undefined,
    });
  }
}
