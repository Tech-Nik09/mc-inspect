<script setup lang="ts">
import ThemeSelection from '@/components/ThemeSelection.vue';
</script>

<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'players' }">Players</router-link>
    </nav>

    <a href="https://github.com/Tech-Nik09/mc-inspect" target="_blank">GitHub</a>

    <ThemeSelection />
  </header>
</template>
