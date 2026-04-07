<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites';
import { computed } from 'vue';
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

const buttonLabel = computed(() => {
  if (isFavorite(props.id)) return 'Remove favorite';
  else if (atFavoritePlayersLimit.value) return 'Cannot add more favorites';
  else return 'Add favorite';
});

const isDisabled = computed(() => atFavoritePlayersLimit.value && !isFavorite(props.id));
</script>

<template>
  <button :disabled="isDisabled" @click="toggleFavorite(props.id, props.type, props.data)" class="btn-primary">
    {{ buttonLabel }}
  </button>
</template>
