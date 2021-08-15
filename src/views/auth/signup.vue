<template>
  <v-card class="text-center pa-1">
    <v-card-title class="justify-center text-h4 mb-2">创建帐号</v-card-title>
    <v-card-subtitle> Let's build amazing products </v-card-subtitle>
    <v-card-text>
      <v-form ref="form">
        <v-text-field label="电子邮件"></v-text-field>

        <v-btn color="primary" block size="x-large">创建帐号</v-btn>

        <div class="caption font-weight-bold text-uppercase my-3">或注册</div>

        <v-btn
          v-for="provider in providers"
          :key="provider.id"
          block
          size="x-large"
          class="mb-2 primary lighten-2 primary--text text--darken-3"
        >
          <v-icon small left>mdi-{{ provider.id }}</v-icon> {{ provider.label }}
        </v-btn>

        <div class="mt-5 text-overline">
          签署即表示您同意
          <br />
          <router-link to=""> 服务条款 </router-link>
          &amp;
          <router-link to=""> 隐私政策 </router-link>
        </div>
      </v-form>
    </v-card-text>
  </v-card>

  <div class="mt-6">
    已经有帐号了？
    <router-link to="/auth/signin" class="font-weight-bold"> 登入 </router-link>
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
