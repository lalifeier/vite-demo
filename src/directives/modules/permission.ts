import type { DirectiveBinding } from 'vue'

export default {
  mounted(el: Element, binding: DirectiveBinding<any>) {
    isPermission(el, binding)
  },

  updated(el: Element, binding: DirectiveBinding<any>) {
    isPermission(el, binding)
  },
}

function isPermission(el: Element, binding: DirectiveBinding<any>) {
  const { value } = binding

  if (!value) return

  // const roles = store.getters && store.getters.roles
  // const permissionRoles = value
  // const hasPermission = roles.some((role) => {
  //   return permissionRoles.includes(role)
  // })
  // if (!hasPermission) {
  el.parentNode?.removeChild(el)
  // }
}
