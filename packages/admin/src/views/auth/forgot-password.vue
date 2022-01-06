<template>
  <v-card class="pa-1" color="transparent">
    <v-card-title class="justify-center text-h4 mb-2">忘记密码？</v-card-title>
    <v-card-subtitle class="justify-center"
      >输入您的帐户电子邮件地址，我们将向您发送一个链接以重置密码。</v-card-subtitle
    >
    <v-card-text>
      <!-- <v-form ref="formRef" v-model="isFormValid" lazy-validation @submit.prevent="submit"> -->
      <v-text-field label="电子邮件"></v-text-field>

      <v-btn color="primary" block size="x-large">要求重设密码</v-btn>
      <!-- </v-form> -->
    </v-card-text>
  </v-card>
  <div class="mt-6">
    <router-link class="text-decoration-underline" to="/auth/signin">返回登录</router-link>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// const formRef = ref(null)

// const isFormValid = ref(false)
// const form = reactive({
//   email: ''
// })

// function submit() { }
</script>

<style scoped></style>
