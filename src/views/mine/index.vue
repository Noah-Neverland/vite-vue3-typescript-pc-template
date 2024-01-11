<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();

  const onClick = async () => {
    userStore.setToken('123111');
  };
</script>

<template>
  <div>
    <el-button type="primary" @click="onClick">保存用户信息</el-button>{{ userStore.getToken }}
  </div>
</template>
