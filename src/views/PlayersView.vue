<script setup>
import { usePlayerStore } from '@/stores/player';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';

const playerStore = usePlayerStore();
</script>

<template>
  <h1>Players</h1>
  <p>Placeholder text for player inspector.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <PlayerSearchBar />
  <p v-if="playerStore.isLoading">Loading</p>
  <p v-else-if="playerStore.error">{{ playerStore.error }}</p>
</template>

<style scoped></style>
