<script setup lang="ts">
import FavoriteToggle from '@/components/FavoriteToggle.vue';
import { useRouter } from 'vue-router';
import type { FavoritePlayer } from '@/types';

const router = useRouter();

const props = defineProps<{
  favorite: FavoritePlayer;
}>();
</script>

<template>
  <div
    @click="router.push({ name: 'playerInfo', params: { playerQuery: favorite.meta.id } })"
    class="flex cursor-pointer rounded-2xl border-2 border-slate-400 dark:border-slate-600"
  >
    <img :src="`https://render.crafty.gg/2d/head/${favorite.data.uuid}?size=96`" alt="" class="m-2 size-16 rounded-2xl lg:size-24" />

    <div class="flex grow flex-col items-center justify-evenly border-l-2 border-slate-400 dark:border-slate-600">
      <p class="font-sans text-lg font-bold">{{ favorite.data.name }}</p>
      <FavoriteToggle @click.stop :favorite />
    </div>
  </div>
</template>
