import { throttle } from 'lodash-es';
import { deepMerge } from '../..';
import { State } from './enum';
import ReactiveListener from './listener';
import { LazyOptions, Target } from './types';
import { getScrollParent, hasIntersectionObserver, isInViewport } from './utils';

const DEFAULT_OBSERVER_OPTIONS = {
  // root: null,
  rootMargin: '0px',
  threshold: 0,
};

const DEFAULT_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const DEFAULT_EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'];

export default class Lazy {
  options: LazyOptions = {
    error: DEFAULT_URL,
    loading: DEFAULT_URL,
    observerOptions: DEFAULT_OBSERVER_OPTIONS,
    throttleDelay: 300,
    preLoad: 1.3,
    listenEvents: DEFAULT_EVENTS,
  };
  observer!: IntersectionObserver;

  listenerQueue: ReactiveListener[] = [];
  targetQueue?: Target[] = [];
  throttleLazyHandler: Function;

  cache: Set<string> = new Set();

  constructor(options?: LazyOptions) {
    this.options = deepMerge(this.options, options);

    this.throttleLazyHandler = throttle(this.lazyHandler.bind(this), this.options.throttleDelay);

    hasIntersectionObserver && this.initIntersectionObserver();
  }

  add(el: HTMLElement, src: string) {
    const { loading, error } = this.options;
    const parent = getScrollParent(el);

    const listener = new ReactiveListener({
      el,
      parent,
      src,
      loading,
      error,
    });
    this.listenerQueue.push(listener);

    if (hasIntersectionObserver) {
      this.observer.observe(el);
    } else {
      this.addListenerTarget(parent);
      this.addListenerTarget(window);

      this.throttleLazyHandler();
    }
  }

  update(el: HTMLElement, src: string) {
    const listener = this.listenerQueue.find((item) => {
      return item.el === el;
    });
    if (!listener) {
      return;
    }
    if (listener.src !== src) {
      listener.src = src;
      listener.state = State.loading;
      listener.load();
    }
  }

  remove(el: HTMLElement) {
    const listener = this.listenerQueue.find((item) => {
      return item.el === el;
    });
    if (!listener) {
      return;
    }
    this.removeListenerQueue(listener);
  }

  removeListenerQueue(listener: ReactiveListener) {
    const index = this.listenerQueue.indexOf(listener);
    if (index > -1) {
      this.listenerQueue.splice(index, 1);
    }
    if (this.observer) {
      this.observer.unobserve(listener.el);
    } else {
      this.removeListenerTarget(listener.parent);
      this.removeListenerTarget(window);
    }
  }

  addListenerTarget(el: HTMLElement | Window): void {
    let target = this.targetQueue!.find((target) => {
      return target.el === el;
    });

    if (!target) {
      target = {
        el,
        ref: 1,
      };
      this.targetQueue!.push(target);
      this.addListener(el);
    } else {
      target.ref++;
    }
  }

  removeListenerTarget(el: HTMLElement | Window): void {
    this.targetQueue!.some((target, index) => {
      if (el === target.el) {
        target.ref--;
        if (!target.ref) {
          this.removeListener(el);
          this.targetQueue!.splice(index, 1);
        }
        return true;
      }
      return false;
    });
  }

  addListener(el: HTMLElement | Window) {
    this.options.listenEvents.forEach((event) =>
      el.addEventListener(event, this.throttleLazyHandler as EventListenerOrEventListenerObject, {
        passive: true,
        capture: false,
      }),
    );
  }

  removeListener(el: HTMLElement | Window) {
    this.options.listenEvents.forEach((event) =>
      el.removeEventListener(event, this.throttleLazyHandler as EventListenerOrEventListenerObject),
    );
  }

  initIntersectionObserver() {
    const { observerOptions } = this.options;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const listener = this.listenerQueue.find((item) => {
            return item.el === entry.target;
          });
          if (listener) {
            if (listener.state === State.loaded) {
              this.removeListenerQueue(listener);
            } else {
              listener.load();
            }
          }
        }
      }, observerOptions);
    });
  }

  lazyHandler() {
    this.listenerQueue.forEach((listener) => {
      if (isInViewport(listener.el, this.options.preLoad)) {
        if (listener) {
          if (listener.state === State.loaded) {
            this.removeListenerQueue(listener);
          } else {
            listener.load();
          }
        }
      }
    });
  }
}
