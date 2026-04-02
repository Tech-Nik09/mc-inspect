import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import type { Favorite, FavoritePlayer, FavoriteServer } from '@/types';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = useLocalStorage<Favorite[]>('favorites', []);

  const favoritePlayers = computed(() => favorites.value.filter((e): e is FavoritePlayer => e.meta.type === 'player'));
  const favoriteServers = computed(() => favorites.value.filter((e): e is FavoriteServer => e.meta.type === 'server'));

  const atFavoritePlayersLimit = computed(() => favoritePlayers.value.length >= 10);
  const atFavoriteServersLimit = computed(() => favoriteServers.value.length >= 10);

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

  function updateFavorite(id: Favorite['meta']['id'], type: Favorite['meta']['type'], data: Favorite['data']): void {
    favorites.value = favorites.value.map((e) => {
      if (e.meta.id === id) return { data, meta: { id, type } };
      return e;
    });
  }

  return { favorites, favoritePlayers, favoriteServers, atFavoritePlayersLimit, atFavoriteServersLimit, isFavorite, toggleFavorite, updateFavorite };
});
