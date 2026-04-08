<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onStartTyping } from '@vueuse/core';

const router = useRouter();

const playerStore = usePlayerStore();
const { isLoading, query } = storeToRefs(playerStore);

const searchBar = useTemplateRef('searchBar');
onStartTyping(() => {
  searchBar.value?.focus();
});

async function onQuery(): Promise<void> {
  const newRoute = await playerStore.fetchPlayer();
  router.push(newRoute);
}
</script>

<template>
  <div class="flex h-12 max-w-lg">
    <input
      type="text"
      :disabled="isLoading"
      @keyup.enter="onQuery"
      v-model="query"
      ref="searchBar"
      placeholder="Enter playername"
      class="w-full rounded-l-2xl border-2 border-r-0 border-accent px-4 text-lg outline-hidden placeholder:text-gray-500"
    />
    <button :disabled="isLoading" @click="onQuery" class="btn-primary h-full w-20 rounded-l-none border-l-0">
      {{ isLoading ? 'loading' : 'Search' }}
    </button>
  </div>
</template>
