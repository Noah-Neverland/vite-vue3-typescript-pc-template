<script lang="ts" setup>
  import { useAppStore } from '@/store/modules/app';

  const appStore = useAppStore();

  const onClick = async () => {
    appStore.setLanguage('en');
  };
</script>

<template>
  <div>
    <el-button type="primary" @click="onClick">保存用户信息</el-button>
  </div>
</template>
