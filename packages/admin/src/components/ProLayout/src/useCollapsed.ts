import { computed, ref, unref, watch } from 'vue';

export function useCollapsed(props) {
  const collapsedRef = ref(props.collapsed);

  watch(
    () => props.collapsed,
    (value) => {
      collapsedRef.value = value;
    },
  );

  const collapsed = computed(() => collapsedRef.value);

  const setCollapsed = (value: boolean) => {
    if (value != unref(collapsedRef)) {
      collapsedRef.value = value;
    }
  };

  return { collapsed, setCollapsed };
}
