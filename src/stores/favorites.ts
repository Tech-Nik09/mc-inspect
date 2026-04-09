import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import type { Favorite, FavoritePlayer, FavoriteServer } from '@/types';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = useLocalStorage<Favorite[]>('favorites', []);

  const favoritePlayers = computed<FavoritePlayer[]>(() => favorites.value.filter((e): e is FavoritePlayer => e.meta.type === 'player'));
  const favoriteServers = computed<FavoriteServer[]>(() => favorites.value.filter((e): e is FavoriteServer => e.meta.type === 'server'));

  const atFavoritePlayersLimit = computed<boolean>(() => favoritePlayers.value.length >= 10);
  const atFavoriteServersLimit = computed<boolean>(() => favoriteServers.value.length >= 10);

  function isFavorite(favorite: Favorite): boolean {
    return favorites.value.some((e) => e.meta.id === favorite.meta.id);
  }

  function isPlayer(favorite: Favorite): favorite is FavoritePlayer {
    return favorite.meta.type === 'player';
  }

  function isServer(favorite: Favorite): favorite is FavoriteServer {
    return favorite.meta.type === 'server';
  }

  function toggleFavorite(favorite: Favorite): void {
    if (isFavorite(favorite)) {
      favorites.value = favorites.value.filter((e) => e.meta.id !== favorite.meta.id);
    } else if ((isPlayer(favorite) && !atFavoritePlayersLimit.value) || (isServer(favorite) && !atFavoriteServersLimit.value)) {
      favorites.value.push(favorite);
    }
  }

  function updateFavorite(favorite: Favorite): void {
    if (!isFavorite(favorite)) return;
    favorites.value = favorites.value.map((e) => {
      if (e.meta.id === favorite.meta.id) return favorite;
      return e;
    });
  }

  return {
    favorites,
    favoritePlayers,
    favoriteServers,
    atFavoritePlayersLimit,
    atFavoriteServersLimit,
    isFavorite,
    isPlayer,
    isServer,
    toggleFavorite,
    updateFavorite,
  };
});
