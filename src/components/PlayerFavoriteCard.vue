<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Favorite } from '@/types';

const router = useRouter();

const props = defineProps<{
  data: Favorite['data'];
}>();
</script>

<template>
  <div @click="router.push({ name: 'playerInfo', params: { playerName: data.name } })">
    <img :src="`https://vzge.me/head/64/${data.skinId}.webp?no=shadow`" alt="" />
    <p>Name: {{ data.name }}</p>
    <p>UUID: {{ data.uuid }}</p>
  </div>
</template>

<style scoped></style>
