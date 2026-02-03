import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const usePlayersStore = defineStore('players', () => {
  const playerName = ref(null);

  return { playerName };
});
