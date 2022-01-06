import { REDIRECT_NAME } from '@/router/routes/constant';
import { unref } from 'vue';
import type { RouteLocationRaw, Router } from 'vue-router';
import { useRouter } from 'vue-router';

function handleError(e: Error) {
  console.error(e);
}

export function useGo(_router?: Router) {
  const { push, replace } = _router || useRouter();
  function go(to: RouteLocationRaw, isReplace = false) {
    if (!to) {
      return;
    }
    isReplace ? replace(to).catch(handleError) : push(to).catch(handleError);
  }
  return go;
}

export const useRedo = (_router?: Router) => {
  const { push, currentRoute } = _router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name';
        params['path'] = String(name);
      } else {
        params['_redirect_type'] = 'path';
        params['path'] = fullPath;
      }
      push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true));
    });
  }
  return redo;
};
