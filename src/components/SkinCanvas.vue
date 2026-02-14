<script setup>
import { usePlayerStore } from '@/stores/player';
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { SkinViewer, IdleAnimation, WalkingAnimation, CrouchAnimation, FlyingAnimation } from 'skinview3d';

const playerStore = usePlayerStore();
const { isLoading, data } = storeToRefs(playerStore);

const canvas = useTemplateRef('skin_container');
let skinViewer = null;

const equipmentType = ref('cape');
const equipmentOptions = {
  noEquipment: { value: 'none', label: 'No equipment' },
  cape: { value: 'cape', label: 'Cape' },
  elytra: { value: 'elytra', label: 'Elytra' },
};

const animationType = ref('idle');
const animationOptions = {
  noAnimation: { value: 'none', label: 'No animation' },
  idle: { value: 'idle', label: 'Idle' },
  walking: { value: 'walking', label: 'Walk' },
  crouching: { value: 'crouching', label: 'Crouch' },
  flying: { value: 'flying', label: 'Fly' },
};

onMounted(() => {
  skinViewer = new SkinViewer({
    canvas: canvas.value,
    width: 300,
    height: 400,
    zoom: 0.7,
  });
  skinViewer.controls.enableZoom = false;

  // TODO: add background toggle, second layer toggle

  watch(
    [data, equipmentType],
    () => {
      loadSkin();
    },
    { immediate: true },
  );

  watch(
    animationType,
    () => {
      loadAnimation();
    },
    { immediate: true },
  );
});

onBeforeUnmount(() => {
  skinViewer.dispose();
});

function loadSkin() {
  skinViewer.loadSkin(data.value.skinUrl);

  if (data.value.name === 'deadmau5') {
    skinViewer.loadEars(data.value.skinUrl, { textureType: 'skin' });
  } else {
    skinViewer.loadEars(null);
  }

  switch (equipmentType.value) {
    case 'none':
      skinViewer.loadCape(null);
      break;
    case 'cape':
      skinViewer.loadCape(data.value.capeUrl);
      break;
    case 'elytra':
      skinViewer.loadCape(data.value.capeUrl, { backEquipment: 'elytra' });
      break;
  }
  if (!data.value.capeUrl) {
    skinViewer.loadCape(null);
  }
}

function loadAnimation() {
  switch (animationType.value) {
    case 'none':
      skinViewer.animation = null;
      break;
    case 'idle':
      skinViewer.animation = new IdleAnimation();
      break;
    case 'walking':
      skinViewer.animation = new WalkingAnimation();
      break;
    case 'crouching':
      // TODO: rename anim variable
      const anim = new CrouchAnimation();
      anim.runOnce = true;
      skinViewer.animation = anim;
      break;
    case 'flying':
      skinViewer.animation = new FlyingAnimation();
      break;
  }
}
</script>

<template>
  <canvas ref="skin_container"></canvas>

  <div v-for="(option, key) in equipmentOptions" :key="key">
    <label>
      <input type="radio" :value="option.value" v-model="equipmentType" />
      {{ option.label }}
    </label>
  </div>
  <p>Equipment type: {{ equipmentType }}</p>

  <div v-for="(option, key) in animationOptions" :key="key">
    <label>
      <input type="radio" :value="option.value" v-model="animationType" />
      {{ option.label }}
    </label>
  </div>
  <p>Animation type: {{ animationType }}</p>
</template>

<style scoped>
canvas {
  background-color: rgb(220, 220, 220);
}
</style>
