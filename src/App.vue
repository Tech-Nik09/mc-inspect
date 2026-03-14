<script setup lang="ts">
import ThemeSelection from '@/components/ThemeSelection.vue';
</script>

<template>
  <header class="main-header">
    <nav class="main-nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'players' }">Players</router-link>
      <router-link :to="{ name: 'playerInfo', params: { playerName: 'examplename' } }">Example player</router-link>
      <router-link :to="{ path: '/does-not-exist' }">URL that doesn't exist</router-link>
    </nav>

    <ThemeSelection />
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
.main-header {
  width: 100vw;
  height: 4rem;

  display: flex;
  align-items: center;

  border-bottom: 1px solid var(--primary-accent-color);
}

.main-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.theme-selection {
  margin-left: auto;
}
</style>
