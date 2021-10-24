<template>
  <v-card class="pa-1" color="transparent">
    <v-card-title class="justify-center text-h4 mb-2">Welcome</v-card-title>
    <v-card-subtitle class="justify-center">登入账号</v-card-subtitle>
    <v-card-text>
      <!-- <v-form ref="form"> -->
      <v-text-field label="电子邮件"></v-text-field>
      <v-text-field label="密码"></v-text-field>

      <v-btn color="primary" block size="x-large">登入</v-btn>

      <div class="caption font-weight-bold text-uppercase my-3">或使用登录</div>

      <div class="d-flex justify-space-between">
        <v-btn outlined large class="flex-grow-1" color="secondary lighten-2">
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn outlined large class="flex-grow-1 mx-2" color="secondary lighten-2">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn outlined large class="flex-grow-1" color="secondary lighten-2">
          <v-icon>mdi-google</v-icon>
        </v-btn>
      </div>

      <div class="mt-5">
        <router-link to="/auth/forgot-password" class="text-decoration-underline"
          >忘记密码？</router-link
        >
      </div>
      <!-- </v-form> -->
    </v-card-text>
  </v-card>
  <div class="mt-6">
    还没有帐号？
    <router-link to="/auth/signup" class="font-weight-bold text-decoration-underline"
      >在此处创建一个</router-link
    >
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
