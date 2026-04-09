<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import type { Favorite } from '@/types';

const favoritesStore = useFavoritesStore();
const { atFavoritePlayersLimit, atFavoriteServersLimit } = storeToRefs(favoritesStore);
const { isFavorite, isPlayer, isServer, toggleFavorite } = favoritesStore;

const props = defineProps<{
  favorite: Favorite;
}>();

const buttonLabel = computed<string>(() => {
  if (isFavorite(props.favorite)) return 'Remove favorite';
  if ((isPlayer(props.favorite) && atFavoritePlayersLimit.value) || (isServer(props.favorite) && atFavoriteServersLimit.value))
    return 'Limit reached';
  return 'Add favorite';
});

const isDisabled = computed<boolean>(() => {
  if (isFavorite(props.favorite)) return false;
  if (isPlayer(props.favorite)) return atFavoritePlayersLimit.value;
  if (isServer(props.favorite)) return atFavoriteServersLimit.value;
  return true;
});
</script>

<template>
  <button :disabled="isDisabled" @click="toggleFavorite(favorite)" class="btn-primary">
    {{ buttonLabel }}
  </button>
</template>
