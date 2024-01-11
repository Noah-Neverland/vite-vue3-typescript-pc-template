<script setup lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
  <div class="app">
    <div class="app-content font-bold text-2xl mb-2">123</div>
    <HelloWorld msg="oooppoo" />
  </div>
</template>

<style lang="scss" scoped>
  .app {
    &-content {
      font-size: 36px;
      color: $main-color;
    }
  }
</style>
