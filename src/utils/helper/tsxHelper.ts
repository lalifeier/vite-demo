import { isFunction } from '@/utils/is'
import { Slots } from 'vue'

export function getSlot(slots: Slots, slot = 'default', data?: any) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn || !isFunction(slotFn)) {
    return null
  }
  return slotFn(data)
}
