import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCurrentPlayerStore = defineStore('currentPlayer', () => {
  const playerName = ref(null);
  const playerError = ref(null);

  return { playerName, playerError };
});
