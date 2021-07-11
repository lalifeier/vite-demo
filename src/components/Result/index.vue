<!-- <template>
  <div class="result" style="background: none">
    <div class="result-icon result-image">
      <img :src="require('../../assets/img/' + config.img)" />
    </div>
    <div class="result-title">{{ config.title }}</div>
    <div class="result-subtitle">{{ config.desc }}</div>
    <div class="result-extra">
      <router-link :to="{ name: 'index' }">
        <el-button type="primary">返回首页</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Result',
    props: {
      config: {
        type: Object,
        require: false,
        default() {
          return {
            img: '',
            title: '',
            desc: ''
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 48px 32px;

    .result-icon {
      margin-bottom: 24px;
      text-align: center;
    }

    &-image {
      width: 250px;
      height: 295px;
    }

    &-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 30px;
      line-height: 1.8;
      text-align: center;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }

    &-subtitle {
      color: rgba(0, 0, 0, 0.45);
      font-size: 18px;
      line-height: 1.6;
      text-align: center;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }

    &-extra {
      margin-top: 26px;
      text-align: center;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(60px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style> -->
