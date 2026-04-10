<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { useFavoritesStore } from '@/stores/favorites';
import SearchBar from '@/components/SearchBar.vue';
import PlayerFavoriteCard from '@/components/PlayerFavoriteCard.vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const playerStore = usePlayerStore();
const { isLoading, error, query } = storeToRefs(playerStore);

const favoritesStore = useFavoritesStore();
const { favoritePlayers } = storeToRefs(favoritesStore);

const router = useRouter();

async function onQuery(): Promise<void> {
  const newRoute = await playerStore.fetchPlayer();
  router.push(newRoute);
}
</script>

<template>
  <div class="mt-8 mb-6 flex flex-col items-center gap-4 sm:mt-16 sm:mb-12">
    <h1 class="font-sans text-4xl font-bold">Skinviewer</h1>

    <SearchBar @query="onQuery" :is-loading v-model="query" placeholder="Enter playername" />
    <p v-if="error">{{ error }}</p>
  </div>

  <template v-if="favoritePlayers.length">
    <div class="flex flex-col gap-2 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] sm:gap-4">
      <PlayerFavoriteCard v-for="favorite in favoritePlayers" :key="favorite.meta.id" :favorite />
    </div>
    <p>Current favorites: {{ favoritePlayers.length }}/10</p>
  </template>
  <p v-else>There are no favorites yet.</p>
</template>
