<!-- <template>
  <div ref="list" class="lazy-list-container" @scroll="handleScroll($event)">
    <div class="lazy-list-content">
      <div v-for="(item, index) in data" :key="index" class="lazy-list-item">{{ item }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue'

  const state: any = reactive({
    count: 40,
    data: []
  })

  export default defineComponent({
    setup() {
      onMounted(() => {
        for (let index = 0; index < state.count; index++) {
          state.data.push(index)
        }

        window.onscroll = () => {
          const maxScrollTop =
            Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) -
            window.innerHeight
          const currentScrollTop = Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop
          )

          if (maxScrollTop - currentScrollTop < 20) {
            const count = state.count
            for (let i = count; i < count + 40; i++) {
              state.data.push(i)
            }
            state.count = count + 40
          }
        }
      })

      function handleScroll(_event) {
        console.log(_event)
      }

      return {
        handleScroll,
        ...toRefs(state)
      }
    }
  })
</script>

<style scoped>
  .lazy-list-container {
    border: 1px solid #666;
  }
  .lazy-list-item {
    box-sizing: border-box;
    height: 30px;
    padding: 5px;
    color: #666;
    line-height: 30px;
  }
</style> -->
