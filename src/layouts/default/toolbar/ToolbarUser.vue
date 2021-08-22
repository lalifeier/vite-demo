import avatar from '/@/assets/img/avatars/avatar1.svg';
<template>
  <!-- <v-menu offset-y left transition="slide-y-transition"> -->
  <!-- <template v-slot:activator="{ on }"> -->
  <!-- <v-btn icon class="elevation-2" v-on="on"> -->
  <v-btn icon>
    <!-- <v-badge color="success" dot bordered offset-x="10" offset-y="10"> -->
    <v-avatar size="40">
      <v-img src="/static/img/avatars/avatar1.svg"></v-img>
    </v-avatar>
    <!-- </v-badge> -->
  </v-btn>
  <!-- </template> -->

  <!-- <v-list dense nav>
      <v-list-item v-for="(item, index) in menu" :key="index">
        <v-list-item-icon>
          <v-icon small>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1"></v-divider>

      <v-list-item to="/auth/signin">
        <v-list-item-icon>
          <v-icon small>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>退出登录</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
  </v-list>-->
  <!-- </v-menu> -->
</template>
<script setup lang="ts">
  // const menu = [
  //   { icon: 'mdi-account-box-outline', text: '个人中心' },
  //   { icon: 'mdi-cog-outline', text: '个人设置' }
  // ]
</script>
