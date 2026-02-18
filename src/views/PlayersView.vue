<script setup>
import { usePlayerStore } from '@/stores/player';
import { useFavouritesStore } from '@/stores/favourites';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';
import PlayerFavouriteCard from '@/components/PlayerFavouriteCard.vue';
import ToggleFavouriteButton from '@/components/ToggleFavouriteButton.vue';
import { storeToRefs } from 'pinia';

const playerStore = usePlayerStore();
const { isLoading, error } = storeToRefs(playerStore);

const favouritesStore = useFavouritesStore();
const { favouritePlayers } = storeToRefs(favouritesStore);
</script>

<template>
  <h1>Players</h1>
  <p>Placeholder text for player inspector.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <PlayerSearchBar />
  <p v-if="isLoading">Loading</p>
  <p v-else-if="error">{{ error }}</p>

  <div v-for="player in favouritePlayers" :key="player.meta.id">
    <PlayerFavouriteCard :data="player" />
    <ToggleFavouriteButton :id="player.meta.id" />
  </div>
</template>

<style scoped></style>
