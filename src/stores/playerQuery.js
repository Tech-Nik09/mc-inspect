import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePlayerQueryStore = defineStore('playerQuery', () => {
  const queryInput = ref(null);
  const queryError = ref(null);

  return { queryInput, queryError };
});
