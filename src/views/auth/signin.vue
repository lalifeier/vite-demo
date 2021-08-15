<template>
  <v-card class="text-center pa-1">
    <v-card-title class="justify-center text-h4 mb-2">Welcome</v-card-title>
    <v-card-subtitle> Sign in to your account </v-card-subtitle>
    <v-card-text>
      <v-form ref="form">
        <v-text-field label="电子邮件"></v-text-field>
        <v-btn color="primary" block size="x-large">登入</v-btn>

        <div class="caption font-weight-bold text-uppercase my-3">或使用登录</div>

        <v-btn
          v-for="provider in providers"
          :key="provider.id"
          block
          size="x-large"
          class="mb-2 primary lighten-2 primary--text text--darken-3"
        >
          <v-icon small left>mdi-{{ provider.id }}</v-icon> {{ provider.label }}
        </v-btn>

        <div class="mt-5">
          <router-link to="/auth/forgot-password"> 忘记密码？ </router-link>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
  <div class="mt-6">
    还没有帐号？
    <router-link to="/auth/signup" class="font-weight-bold"> 在此处创建一个 </router-link>
  </div>
</template>

<script setup lang="ts">
  const providers = [
    {
      id: 'google',
      label: 'Google',
      isLoading: false
    },
    {
      id: 'facebook',
      label: 'Facebook',
      isLoading: false
    }
  ]
</script>

<style scoped></style>
