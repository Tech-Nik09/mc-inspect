<script setup>
import { usePlayerStore } from '@/stores/player';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';

const store = usePlayerStore();
</script>

<template>
  <h1>Player Info</h1>
  <p>Placeholder text for player info site.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <PlayerSearchBar />

  <h2>Fetched player data</h2>
  <template v-if="store.data">
    <p>name: {{ store.data.name }}</p>
    <p>uuid: {{ store.data.uuid }}</p>
    <p>skinId: {{ store.data.skinId }}</p>
    <p>playerModel: {{ store.data.playerModel }}</p>
    <p>skinUrl: {{ store.data.skinUrl }}</p>
    <p v-if="store.data.capeUrl">capeUrl: {{ store.data.capeUrl }}</p>

    <img :src="store.data.skinUrl" alt="" />
    <img v-if="store.data.capeUrl" :src="store.data.capeUrl" alt="" />
    <img :src="`https://vzge.me/full/192/${store.data.skinId}.webp?${store.data.playerModel}&no=shadow`" alt="" />
  </template>
  <p v-if="store.isLoading">Loading</p>
</template>

<style scoped></style>
