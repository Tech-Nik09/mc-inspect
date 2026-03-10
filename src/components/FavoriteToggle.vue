<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites';
import { storeToRefs } from 'pinia';
import type { Favorite } from '@/types';

const favoritesStore = useFavoritesStore();
const { atFavoritePlayersLimit } = storeToRefs(favoritesStore);
const { isFavorite, toggleFavorite } = favoritesStore;

const props = defineProps<{
  id: Favorite['meta']['id'];
  type: Favorite['meta']['type'];
  data: Favorite['data'];
}>();
</script>

<template>
  <button :disabled="atFavoritePlayersLimit && !isFavorite(id)" @click="toggleFavorite(props.id, props.type, props.data)">
    {{ isFavorite(props.id) ? 'Remove from favorites' : 'Add to favorites' }}
  </button>
</template>

<style scoped></style>
