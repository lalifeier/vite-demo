import Clipboard from 'clipboard';

export default {
  mounted(el, binding) {
    if (binding.arg === 'success') {
      el._vClipboard_success = binding.value;
    } else if (binding.arg === 'error') {
      el._vClipboard_error = binding.value;
    } else {
      const clipboard = new Clipboard(el, {
        text() {
          return binding.value;
        },
        action() {
          return binding.arg === 'cut' ? 'cut' : 'copy';
        },
      });
      clipboard.on('success', (e) => {
        const callback = el._vClipboard_success;
        callback && callback(e);
      });
      clipboard.on('error', (e) => {
        const callback = el._vClipboard_error;
        callback && callback(e);
      });
      el._vClipboard = clipboard;
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el._vClipboard_success = binding.value;
    } else if (binding.arg === 'error') {
      el._vClipboard_error = binding.value;
    } else {
      el._vClipboard.text = function () {
        return binding.value;
      };
      el._vClipboard.action = function () {
        return binding.arg === 'cut' ? 'cut' : 'copy';
      };
    }
  },
  unmounted(el, binding) {
    if (binding.arg === 'success') {
      delete el._vClipboard_success;
    } else if (binding.arg === 'error') {
      delete el._vClipboard_error;
    } else {
      el._vClipboard.destroy();
      delete el._vClipboard;
    }
  },
};
