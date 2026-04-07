<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>

<template>
  <Header />
  <main class="m-2 flex justify-center sm:m-4">
    <div class="max-w-400 grow">
      <router-view></router-view>
    </div>
  </main>
</template>
