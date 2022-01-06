import { useUserStore } from '@/store/modules/user';
import axios from 'axios';

let isRefreshing = false;
let requests: Array<Function> = [];

export async function refreshTokenRequest(config) {
  if (!isRefreshing) {
    isRefreshing = true;
    const userStore = useUserStore();
    return userStore
      .refresh()
      .then((token) => {
        config.headers.Authorization = token;
        config.baseURL = '';
        requests.forEach((cb: Function) => cb(token));
        requests = [];
        return axios(config);
      })
      .catch((err) => {
        userStore.setToken(undefined, undefined);
        window.location.reload();
        return Promise.reject(err);
      })
      .finally(() => {
        isRefreshing = false;
      });
  }
  return new Promise((resolve) => {
    requests.push((token) => {
      config.baseURL = '';
      config.headers.Authorization = token;
      resolve(axios(config));
    });
  });
}
