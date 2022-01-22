const direct_s = ['left', 'right']
const direct_1 = ['left', 'right', 'down', 'up']
const direct_1_b = ['downBig', 'upBig', 'leftBig', 'rightBig']
const direct_2 = ['topLeft', 'bottomRight', 'topRight', 'bottomLeft']
const direct_3 = ['downLeft', 'upRight', 'downRight', 'upLeft']

export const animates = [
  { value: 'back', label: '渐近', directions: direct_1 },
  { value: 'bounce', label: '弹跳', directions: direct_1.concat('default') },
  {
    value: 'fade',
    label: '淡化',
    directions: direct_1.concat(direct_1_b).concat(direct_2).concat('default'),
  },
  { value: 'flip', label: '翻转', directions: ['x', 'y'] },
  { value: 'lightSpeed', label: '光速', directions: direct_s },
  { value: 'rotate', label: '旋转', directions: direct_3.concat('default') },
  { value: 'roll', label: '翻滚', directions: ['default'] },
  { value: 'zoom', label: '缩放', directions: direct_1.concat('default') },
  { value: 'slide', label: '滑动', directions: direct_1 },
]

export const directions = [
  'x',
  'y',
  'left',
  'right',
  'up',
  'down',
  'downLeft',
  'upRight',
  'downRight',
  'upLeft',
  'downBig',
  'upBig',
  'downLeft',
  'downRight',
  'topRight',
  'bottomLeft',
  'topLeft',
  'bottomRight',
  'default',
]
