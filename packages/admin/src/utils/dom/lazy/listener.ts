import { State } from './enum';
import { ListenerOptions } from './types';
import loadImage from './utils';

export default class ReactiveListener {
  el: HTMLElement;
  parent: HTMLElement | Window;
  src: string;
  error: string;
  loading: string;
  state: State;

  constructor(options: ListenerOptions) {
    const { el, src, loading, error, parent } = options;

    this.el = el;
    this.parent = parent;
    this.src = src;
    this.error = error;
    this.loading = loading;

    this.state = State.loading;

    this.render(loading);
  }

  load(): void {
    if (this.state > State.loading) {
      return;
    }
    this.renderImage();
  }

  render(src: string): void {
    this.el.setAttribute('src', src);
  }

  renderImage() {
    loadImage(this.src)
      .then(() => {
        this.state = State.loaded;
        this.render(this.src);
      })
      .catch((e) => {
        console.log(e);

        this.state = State.error;
        this.render(this.error);
      });
  }
}
