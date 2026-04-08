<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import SearchBar from '@/components/SearchBar.vue';
import CopyButton from '@/components/CopyButton.vue';
import FavoriteToggle from '@/components/FavoriteToggle.vue';
import { downloadFileFromURL } from '@/utils/downloadFileFromURL';
import { computed, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
const SkinView = defineAsyncComponent(() => import('@/components/SkinCanvas.vue'));

const playerStore = usePlayerStore();
const { isLoading, data, query } = storeToRefs(playerStore);

const route = useRoute();
const router = useRouter();
const currentLocation = computed((): string => window.location.origin + route.fullPath);

async function onQuery(): Promise<void> {
  const newRoute = await playerStore.fetchPlayer();
  router.push(newRoute);
}
</script>

<template>
  <h1>Player Info</h1>

  <SearchBar @query="onQuery" :is-loading="isLoading" v-model="query" :placeholder="'Enter playername'" />

  <template v-if="data">
    <div>
      <CopyButton :text="currentLocation" label="shareable link" />
      <button @click="downloadFileFromURL(data.skinUrl, `${data.name}_skin.png`)">Download Skin</button>
      <button v-if="data.capeUrl" @click="downloadFileFromURL(data.capeUrl, `${data.name}_cape.png`)">Download Cape</button>
      <FavoriteToggle :id="data.uuid" type="player" :data="{ name: data.name, uuid: data.uuid, skinId: data.skinId }" />
    </div>

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
