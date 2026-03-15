<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<template>
  <Header />
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
main {
  padding-top: 5rem;
}

.main-header {
  position: fixed;
}
</style>
