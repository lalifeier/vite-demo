import { uuidv4 } from '@/utils/uuid'
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import type { IPlayerOptions } from 'xgplayer'
import Player from 'xgplayer/dist/simple_player'
import playbackRate from 'xgplayer/es/controls/playbackRate'
import volume from 'xgplayer/es/controls/volume'

const props = {
  id: {
    type: String,
    default: () => {
      return 'vue-xgplayer-' + uuidv4()
    },
  },
  url: {
    type: String,
    default: 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo-720p.mp4',
  },
  width: {
    type: [Number, String] as PropType<string | number>,
    required: false,
    default: 'auto',
  },
  height: {
    type: [Number, String] as PropType<string | number>,
    required: false,
    default: 600,
  },
  options: {
    type: Object as PropType<IPlayerOptions>,
    default: () => {},
  },
}

export default defineComponent({
  name: 'Video',
  props,
  emits: ['init'],
  setup(props, { emit }) {
    const elRef = ref<ElRef>(null)
    const player = ref<Nullable<Player>>(null)

    onMounted(() => {
      init()
    })

    onBeforeUnmount(destroy)

    function init() {
      player.value = new Player({
        id: props.id,
        // width,
        // height,
        autoplay: false,
        fluid: true,
        // fluid: deviceDetection(),
        controlPlugins: [volume, playbackRate],
        // screenShot: true,
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        ...props.options,
        url: props.url,
      })

      emit('init', player.value)
    }

    function destroy() {
      player.value?.destroy()
    }

    return () => <div id={props.id} ref={elRef}></div>
  },
})
