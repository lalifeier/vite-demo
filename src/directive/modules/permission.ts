import type { DirectiveBinding } from 'vue'

export default {
  mounted(el: Element, binding: DirectiveBinding<any>) {
    checkPermission(el, binding)
  },
  updated(el: Element, binding: DirectiveBinding<any>) {
    checkPermission(el, binding)
  },
}

function checkPermission(el: Element, binding: DirectiveBinding<any>) {
  const { value } = binding
  // const roles = store.getters && store.getters.roles

  if (value && value instanceof Array) {
    if (value.length > 0) {
      // const permissionRoles = value
      // const hasPermission = roles.some((role) => {
      //   return permissionRoles.includes(role)
      // })
      // if (!hasPermission) {
      // el.parentNode?.removeChild(el)
      // }
    }
  } else {
    throw new Error("need roles! Like v-permission=\"['admin','editor']\"")
  }
}
