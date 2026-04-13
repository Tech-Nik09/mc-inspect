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
    class="group transition[border-color,box-shadow] flex cursor-pointer rounded-2xl border-2 border-slate-400 hover-smooth hover:border-accent hover:shadow-center-md hover:shadow-accent dark:border-slate-600"
  >
    <img :src="`https://render.crafty.gg/2d/head/${favorite.data.uuid}?size=96`" alt="" class="m-2 size-16 rounded-2xl lg:size-24" />

    <div
      class="transition[border-color] flex grow flex-col items-center justify-evenly border-l-2 border-slate-400 hover-smooth group-hover:border-accent dark:border-slate-600"
    >
      <p class="font-sans text-lg font-bold">{{ favorite.data.name }}</p>
      <FavoriteToggle @click.stop :favorite />
    </div>
  </div>
</template>
