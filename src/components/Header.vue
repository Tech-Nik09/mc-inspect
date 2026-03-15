<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import ThemeSelection from '@/components/ThemeSelection.vue';
import { storeToRefs } from 'pinia';

const playerStore = usePlayerStore();
const { isLoading } = storeToRefs(playerStore);
</script>

<template>
  <header class="main-header" :class="{ loading: isLoading }">
    <nav class="main-nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'players' }">Players</router-link>
      <router-link :to="{ name: 'playerInfo', params: { playerName: 'examplename' } }">Example player</router-link>
      <router-link :to="{ path: '/does-not-exist' }">URL that doesn't exist</router-link>
    </nav>

    <ThemeSelection />
  </header>
</template>

<style scoped>
.main-header {
  width: 100vw;
  height: 4rem;

  display: flex;
  align-items: center;

  background-color: var(--primary-background-color);
  border-bottom: 2px solid var(--primary-border-color);

  transition: border-color var(--theme-transition);
}

.main-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.theme-selection {
  margin-left: auto;
}

.loading {
  position: relative;
}

.loading::after {
  content: '';

  height: 2px;

  position: absolute;
  bottom: -2px;

  background-color: var(--primary-accent-color);

  animation: loading 1s linear infinite alternate;
}

@keyframes loading {
  0% {
    left: 0;
    width: 5%;
  }

  50% {
    left: 30%;
    width: 40%;
  }

  100% {
    left: 95%;
    width: 5%;
  }
}
</style>
