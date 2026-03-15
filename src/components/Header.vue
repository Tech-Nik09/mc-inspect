<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import ThemeSelection from '@/components/ThemeSelection.vue';
import { storeToRefs } from 'pinia';
import MdiGithub from '~icons/mdi/github';

const playerStore = usePlayerStore();
const { isLoading } = storeToRefs(playerStore);
</script>

<template>
  <header class="main-header" :class="{ loading: isLoading }">
    <nav class="main-nav">
      <router-link class="main-link" :to="{ name: 'home' }">Home</router-link>
      <router-link class="main-link" :to="{ name: 'players' }">Players</router-link>
    </nav>

    <a href="https://github.com/Tech-Nik09/mc-inspect" target="_blank" class="github-link">
      <MdiGithub class="github-icon" />
    </a>

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

  transition:
    background-color var(--theme-transition),
    border-color var(--theme-transition);
}

.main-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.main-link {
  font-size: 1.3rem;
  font-weight: 700;

  position: relative;

  transition: color 0.5s ease-out;
}

.main-link:hover {
  color: var(--primary-accent-color);
}

.main-link::after {
  content: '';

  width: 0;
  height: 2px;

  position: absolute;
  bottom: -6px;
  left: 50%;

  background-color: var(--primary-accent-color);

  transition:
    left 0.5s ease-out,
    width 0.5s ease-out;
}

.main-link:hover::after {
  width: 100%;
  left: 0;
}

.github-link {
  width: 2.5rem;
  height: 2.5rem;

  margin-right: 1rem;
  margin-left: auto;
}

.github-icon {
  width: 100%;
  height: 100%;

  color: var(--primary-font-color);

  transition:
    color var(--hover-transition),
    transform var(--hover-transition);
}

.github-link:hover .github-icon {
  color: var(--primary-accent-color);
  transform: translateY(-6px) scale(1.1);
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
