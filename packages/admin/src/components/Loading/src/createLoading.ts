import { createVNode, defineComponent, h, reactive, render, VNode } from 'vue';
import Loading from './index';

export function createLoading(props, target?: HTMLElement) {
  let vm: Nullable<VNode> = null;
  const data = reactive({
    loading: true,
    ...props,
  });

  const LoadingWrap = defineComponent({
    render() {
      return h(Loading, { ...data });
    },
  });

  vm = createVNode(LoadingWrap);
  render(vm, document.createElement('div'));

  function open(target: HTMLElement = document.body) {
    if (!vm || !vm.el) {
      return;
    }
    target.appendChild(vm.el as HTMLElement);
  }

  function close() {
    if (vm?.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
  }

  if (target) {
    open(target);
  }

  return {
    vm,
    open,
    close,
    get $el() {
      return vm?.el as HTMLElement;
    },
  };
}
