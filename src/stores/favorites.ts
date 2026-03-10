import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { Favorite, FavoritePlayer, FavoriteServer } from '@/types';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Favorite[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));

  const favoritePlayers = computed(() => favorites.value.filter((e): e is FavoritePlayer => e.meta.type === 'player'));
  const favoriteServers = computed(() => favorites.value.filter((e): e is FavoriteServer => e.meta.type === 'server'));

  const atFavoritePlayersLimit = computed(() => favoritePlayers.value.length >= 10);
  const atFavoriteServersLimit = computed(() => favoriteServers.value.length >= 10);

  watch(
    favorites,
    () => {
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    },
    { deep: true },
  );

  function isFavorite(id: Favorite['meta']['id']): boolean {
    return favorites.value.some((e) => e.meta.id === id);
  }

  function toggleFavorite(id: Favorite['meta']['id'], type: Favorite['meta']['type'], data: Favorite['data']): void {
    if (isFavorite(id)) {
      favorites.value = favorites.value.filter((e) => e.meta.id !== id);
    } else if ((type === 'player' && !atFavoritePlayersLimit.value) || (type === 'server' && !atFavoriteServersLimit.value)) {
      favorites.value.push({ data, meta: { id, type } });
    }
  }

  return { favoritePlayers, favoriteServers, atFavoritePlayersLimit, atFavoriteServersLimit, isFavorite, toggleFavorite };
});
