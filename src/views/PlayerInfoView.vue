<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import SearchBar from '@/components/SearchBar.vue';
import CopyButton from '@/components/CopyButton.vue';
import FavoriteToggle from '@/components/FavoriteToggle.vue';
import { downloadFileFromURL } from '@/utils/download';
import { computed, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import type { FavoritePlayer } from '@/types';
const SkinView = defineAsyncComponent(() => import('@/components/SkinCanvas.vue'));

const playerStore = usePlayerStore();
const { isLoading, data, query } = storeToRefs(playerStore);

const route = useRoute();
const router = useRouter();
const currentLocation = computed<string>(() => window.location.origin + route.fullPath);

async function onQuery(): Promise<void> {
  const newRoute = await playerStore.fetchPlayer();
  router.push(newRoute);
}

const currentPlayer = computed<FavoritePlayer | null>(() => {
  if (!data.value) return null;
  return {
    meta: {
      type: 'player',
      id: data.value.uuid,
    },
    data: {
      name: data.value.name,
      uuid: data.value.uuid,
    },
  };
});
</script>

<template>
  <template v-if="data">
    <section class="mt-8 mb-6 flex flex-col items-center gap-4 sm:mt-16 sm:mb-12">
      <h1 class="font-sans text-4xl font-bold">Skinviewer</h1>

      <SearchBar @query="onQuery" :is-loading v-model="query" placeholder="Enter playername" />

      <div class="flex w-full max-w-lg flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
        <FavoriteToggle v-if="currentPlayer" :favorite="currentPlayer" class="btn-reverse" />
        <CopyButton :text="currentLocation" label="link" class="btn-reverse" />

        <button @click="downloadFileFromURL(data.skinUrl, `${data.name}_skin.png`)" class="btn-reverse">Download Skin</button>
        <button v-if="data.capeUrl" @click="downloadFileFromURL(data.capeUrl, `${data.name}_cape.png`)" class="btn-reverse">Download Cape</button>
        <button v-else disabled class="btn-reverse hidden sm:inline">Download Cape</button>
      </div>
    </section>

    <hr class="h-0.5 w-full bg-slate-400 text-slate-400 dark:bg-slate-600 dark:text-slate-600" />

    <section class="relative mt-8 flex flex-col items-center gap-4 sm:mt-16">
      <h2 class="font-sans text-2xl font-bold">{{ data.name }}</h2>
    </section>

    <h2>Fetched player data</h2>
    <div>
      <p>name: {{ data.name }}</p>
      <CopyButton :text="data.name" label="Name" />

      <p>uuid: {{ data.uuid }}</p>
      <CopyButton :text="data.uuid" label="UUID" />

      <p>skinId: {{ data.skinId }}</p>
      <CopyButton :text="data.skinId" label="Skin ID" />

      <p>playerModel: {{ data.playerModel }}</p>
      <CopyButton :text="data.playerModel" label="Model" />

      <p>skinUrl: {{ data.skinUrl }}</p>
      <CopyButton :text="data.skinUrl" label="Skin URL" />

      <template v-if="data.capeUrl">
        <p>capeUrl: {{ data.capeUrl }}</p>
        <CopyButton :text="data.capeUrl" label="Cape URL" />
      </template>
    </div>

    <SkinView />
  </template>
</template>
