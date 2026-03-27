<script setup lang="ts">
import ThemeSelection from '@/components/ThemeSelection.vue';
</script>

<template>
  <nav>
    <div>
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'players' }">Players</router-link>
    </div>

    <ThemeSelection />
  </nav>
  <main>
    <router-view></router-view>
  </main>
</template>
