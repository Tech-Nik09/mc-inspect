<script setup>
import { usePlayerStore } from '@/stores/player';
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { SkinViewer, IdleAnimation } from 'skinview3d';

const playerStore = usePlayerStore();
const { isLoading, data } = storeToRefs(playerStore);

const canvas = useTemplateRef('skin_container');
let skinViewer = null;

onMounted(() => {
  skinViewer = new SkinViewer({
    canvas: canvas.value,
    width: 300,
    height: 400,
    zoom: 0.7,
    animation: new IdleAnimation(),
  });

  skinViewer.controls.enableZoom = false;
  // TODO: add animation selection, background toggle, second layer toggle, cape toggle

  watch(
    data,
    () => {
      loadSkin();
    },
    { immediate: true },
  );
});

onBeforeUnmount(() => {
  skinViewer.dispose();
});

function loadSkin() {
  skinViewer.loadSkin(data.value.skinUrl);

  if (data.value.capeUrl) {
    skinViewer.loadCape(data.value.capeUrl);
  } else {
    skinViewer.loadCape(null);
  }

  if (data.value.name === 'deadmau5') {
    skinViewer.loadEars(data.value.skinUrl, { textureType: 'skin' });
  } else {
    skinViewer.loadEars(null);
  }
}
</script>

<template>
  <canvas ref="skin_container"></canvas>
</template>

<style scoped>
canvas {
  background-color: rgb(220, 220, 220);
}
</style>
