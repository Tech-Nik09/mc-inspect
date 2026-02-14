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
  noEquipment: { value: null, label: 'No equipment' },
  cape: { value: 'cape', label: 'Cape' },
  elytra: { value: 'elytra', label: 'Elytra' },
};

const animationType = ref('idle');
const animationOptions = {
  noAnimation: { value: null, label: 'No animation' },
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
      setSkin();
    },
    { immediate: true },
  );

  watch(
    animationType,
    () => {
      setAnimation();
    },
    { immediate: true },
  );
});

onBeforeUnmount(() => {
  skinViewer.dispose();
});

function setSkin() {
  skinViewer.loadSkin(data.value.skinUrl);

  if (data.value.capeUrl && equipmentType.value) {
    skinViewer.loadCape(data.value.capeUrl, { backEquipment: equipmentType.value });
  } else {
    skinViewer.loadCape(null);
  }

  if (data.value.name === 'deadmau5') {
    skinViewer.loadEars(data.value.skinUrl, { textureType: 'skin' });
  } else {
    skinViewer.loadEars(null);
  }
}

function setAnimation() {
  let newAnimation = null;
  switch (animationType.value) {
    case 'idle':
      newAnimation = new IdleAnimation();
      break;
    case 'walking':
      newAnimation = new WalkingAnimation();
      break;
    case 'crouching':
      newAnimation = new CrouchAnimation();
      newAnimation.runOnce = true;
      break;
    case 'flying':
      newAnimation = new FlyingAnimation();
      break;
    default:
      newAnimation = null;
  }
  skinViewer.animation = newAnimation;
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
