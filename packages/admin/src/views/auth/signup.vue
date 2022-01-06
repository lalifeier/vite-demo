<template>
  <v-card class="pa-1" color="transparent">
    <v-card-title class="justify-center text-h4 mb-2">Welcome</v-card-title>
    <v-card-subtitle class="justify-center">创建帐号</v-card-subtitle>
    <v-card-text>
      <!-- <v-form ref="form"> -->
      <v-text-field label="用户名"></v-text-field>
      <v-text-field label="电子邮件"></v-text-field>
      <v-text-field label="密码"></v-text-field>

      <v-btn color="primary" block size="x-large">创建帐号</v-btn>

      <div class="caption font-weight-bold text-uppercase my-3">或注册</div>

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

      <div class="mt-5 text-overline">
        签署即表示您同意
        <br />
        <router-link class="text-decoration-underline" to>服务条款</router-link>&amp;
        <router-link class="text-decoration-underline" to>隐私政策</router-link>
      </div>
      <!-- </v-form> -->
    </v-card-text>
  </v-card>

  <div class="mt-6">
    已经有帐号了？
    <router-link to="/auth/signin" class="font-weight-bold text-decoration-underline">登入</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
