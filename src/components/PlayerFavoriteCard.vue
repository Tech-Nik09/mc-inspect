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
  <div @click="router.push({ name: 'playerInfo', params: { playerName: favorite.data.name } })">
    <img :src="`https://render.crafty.gg/2d/head/${favorite.data.skinId}?size=96`" alt="" />
    <p>Name: {{ favorite.data.name }}</p>
    <p>UUID: {{ favorite.data.uuid }}</p>
    <FavoriteToggle @click.stop :id="favorite.meta.id" :type="favorite.meta.type" :data="favorite.data" />
  </div>
</template>
