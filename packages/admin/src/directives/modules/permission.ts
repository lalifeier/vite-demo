import { Role } from '@/enums/role';
import { useUserStore } from '@/store/modules/user';
import { isArray } from '@/utils/is';
import type { DirectiveBinding } from 'vue';

export default {
  mounted(el: Element, binding: DirectiveBinding<any>) {
    isPermission(el, binding);
  },

  updated(el: Element, binding: DirectiveBinding<any>) {
    isPermission(el, binding);
  },
};

function hasPermission(permissionRoles: Role | Role[], roles: Role[]) {
  if (!isArray(permissionRoles)) {
    return roles.includes(permissionRoles as Role);
  }
  const hasPermission = roles.some((role) => {
    return permissionRoles.includes(role);
  });
  return hasPermission;
}

function isPermission(el: Element, binding: DirectiveBinding<any>) {
  const { value } = binding;
  if (!value) return;

  const userStore = useUserStore();
  const roleList = userStore.getRoleList;

  if (!hasPermission(value, roleList)) {
    el.parentNode?.removeChild(el);
  }
}
