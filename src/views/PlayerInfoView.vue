<script setup>
import { usePlayerStore } from '@/stores/player';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';

const playerStore = usePlayerStore();
</script>

<template>
  <h1>Player Info</h1>
  <p>Placeholder text for player info site.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <PlayerSearchBar />

  <h2>Fetched player data</h2>
  <template v-if="playerStore.data">
    <p>name: {{ playerStore.data.name }}</p>
    <p>uuid: {{ playerStore.data.uuid }}</p>
    <p>skinId: {{ playerStore.data.skinId }}</p>
    <p>playerModel: {{ playerStore.data.playerModel }}</p>
    <p>skinUrl: {{ playerStore.data.skinUrl }}</p>
    <p v-if="playerStore.data.capeUrl">capeUrl: {{ playerStore.data.capeUrl }}</p>

    <img :src="playerStore.data.skinUrl" alt="" />
    <img v-if="playerStore.data.capeUrl" :src="playerStore.data.capeUrl" alt="" />
    <img :src="`https://vzge.me/full/192/${playerStore.data.skinId}.webp?${playerStore.data.playerModel}&no=shadow`" alt="" />
  </template>
  <p v-if="playerStore.isLoading">Loading</p>
</template>

<style scoped></style>
