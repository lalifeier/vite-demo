import { computed, defineComponent } from 'vue';
import { animates, directions } from './constants';

const props = {
  disabled: {
    type: Boolean,
    default: false,
  },
  animate: {
    type: String,
    validator(value) {
      return animates.findIndex((item) => item.value === value) !== -1;
    },
    default: 'bounce',
  },
  direction: {
    type: String,
    validator(value) {
      return directions.indexOf(value) !== -1;
    },
    default: '',
  },
  reverse: {
    type: Boolean,
    default: true,
  },
};

export default defineComponent({
  name: 'Transition',
  props,
  setup(props, { slots }) {
    const enterActiveClass = computed(() => `animate__animated ${activeClass(false)}`);
    const leaveActiveClass = computed(() => `animate__animated ${activeClass(true)}`);

    function activeClass(isLeave) {
      const animate = animates.find((item) => props.animate === item.value);
      if (animate === undefined) {
        return '';
      }
      let direction: any = '';
      if (props.direction === undefined) {
        direction = animate.directions[0];
      } else {
        direction = animate.directions.find((item) => item === props.direction);
      }
      direction = direction === undefined || direction === 'default' ? '' : direction;
      if (direction !== '') {
        direction = isLeave && props.reverse ? reversePosition(direction, animate.directions) : direction;
        direction = direction[0].toUpperCase() + direction.substring(1);
      }
      const t = isLeave ? 'Out' : 'In';
      return `animate__${props.animate}${t}${direction}`;
    }

    function reversePosition(direction, directions) {
      if (direction.length === 0 || direction === 'x' || direction === 'y') {
        return direction;
      }
      let index = directions.indexOf(direction);
      index = index % 2 === 1 ? index - 1 : index + 1;
      return directions[index];
    }

    return () => {
      props.disabled ? (
        <transition enter-active-class={enterActiveClass.value} leave-active-class={leaveActiveClass.value}>
          {slots.default?.()}
        </transition>
      ) : (
        <div>{slots.default?.()}</div>
      );
    };
  },
});
