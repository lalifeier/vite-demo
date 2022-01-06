import axios from 'axios';
import LRUCache from 'lru-cache';
import { generateReqKey } from '../utils';

const FIVE_MINUTES = 1000 * 60 * 5;
const CAPACITY = 100;

const cache = new LRUCache({ maxAge: FIVE_MINUTES, max: CAPACITY });

export function getCacheRequest(config) {
  const requestKey = generateReqKey(config);
  const data = cache.get(requestKey);

  if (!data) {
    cache.del(requestKey);
    return;
  }
  config.cancelToken = new axios.CancelToken((cancel) => {
    cancel(data);
  });
}

export function setCacheRequest(response, expire) {
  const requestKey = generateReqKey(response.config);
  cache.set(requestKey, response, expire);
}
