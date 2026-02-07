<script setup>
import { usePlayerStore } from '@/stores/player';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';

const store = usePlayerStore();
</script>

<template>
  <h1>Players</h1>
  <p>Placeholder text for player inspector.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <PlayerSearchBar />
  <p v-if="store.isLoading">Loading</p>
  <p v-if="store.error">{{ store.error }}</p>
</template>

<style scoped></style>
