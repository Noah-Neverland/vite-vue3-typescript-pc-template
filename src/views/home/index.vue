<script lang="ts" setup>
  import HelloWorld from '@/components/HelloWorld.vue';
  const message = ref<string>('123');
</script>

<template>
  <div>
    <div class="app-content font-bold text-2xl mb-2">123</div>
    <HelloWorld msg="oooppoo" />
    {{ message }}
  </div>
</template>
