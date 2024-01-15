<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import HelloWorld from '@/components/HelloWorld.vue';

  const router = useRouter();

  const onClick = (path: string) => {
    router.push({ path });
  };
  const message = ref<string>('123123');
</script>

<template>
  <div>
    <ul>
      <li @click="onClick('/')">首页</li>
      <li @click="onClick('mine')">我的</li>
    </ul>
    <div class="app-content font-bold text-2xl mb-2">123</div>
    <HelloWorld msg="oooppoo" />
    {{ message }}
  </div>
</template>
