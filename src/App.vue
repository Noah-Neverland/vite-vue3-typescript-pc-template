<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const onClick = (path: string) => {
    router.push({ path });
  };
</script>

<template>
  <div class="app">
    <ul>
      <li @click="onClick('/')">首页</li>
      <li @click="onClick('mine')">我的</li>
    </ul>
    <router-view />
  </div>
</template>
