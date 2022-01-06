import { watch } from 'vue';
import { useRouter } from 'vue-router';

export function useTitle() {
  const { currentRoute } = useRouter();
  watch([() => currentRoute.value.path], () => {}, { immediate: true });
}
