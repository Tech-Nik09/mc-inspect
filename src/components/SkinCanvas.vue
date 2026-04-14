<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useElementSize } from '@vueuse/core';
import { SkinViewer, IdleAnimation, WalkingAnimation, CrouchAnimation, FlyingAnimation } from 'skinview3d';

const playerStore = usePlayerStore();
const { data } = storeToRefs(playerStore);

const skinCanvas = useTemplateRef('skinCanvas');
const skinCanvasContainer = useTemplateRef('skinCanvasContainer');
const { width, height } = useElementSize(skinCanvasContainer);
let skinViewer: SkinViewer;

const showOuterLayer = ref(true);
const hasCape = ref(false);

const equipmentOptions = {
  noEquipment: { value: null, label: 'No equipment' },
  cape: { value: 'cape', label: 'Cape' },
  elytra: { value: 'elytra', label: 'Elytra' },
} as const;
type EquipmentType = (typeof equipmentOptions)[keyof typeof equipmentOptions]['value'];
const equipmentType = ref<EquipmentType>('cape');

const animationOptions = {
  noAnimation: { value: null, label: 'No animation' },
  idle: { value: 'idle', label: 'Idle' },
  walking: { value: 'walking', label: 'Walk' },
  crouching: { value: 'crouching', label: 'Crouch' },
  flying: { value: 'flying', label: 'Fly' },
} as const;
type AnimationType = (typeof animationOptions)[keyof typeof animationOptions]['value'];
const animationType = ref<AnimationType>('idle');

onMounted(() => {
  if (!skinCanvas.value) return;

  skinViewer = new SkinViewer({
    canvas: skinCanvas.value,
    width: width.value || 300,
    height: height.value || 400,
    zoom: 0.7,
  });
  skinViewer.controls.enableZoom = false;

  watch([width, height], ([newWidth, newHeight]) => {
    skinViewer.setSize(newWidth, newHeight);
  });

  watchEffect(() => {
    setSkin();
  });

  watchEffect(() => {
    setAnimation();
  });

  watchEffect(() => {
    skinViewer.playerObject.skin.setOuterLayerVisible(showOuterLayer.value);
  });
});

onBeforeUnmount(() => {
  skinViewer.dispose();
});

function setSkin(): void {
  if (!data.value) return;

  skinViewer.loadSkin(data.value.skinUrl);

  hasCape.value = !!data.value.capeUrl;

  if (hasCape.value && equipmentType.value && data.value.capeUrl) {
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

function setAnimation(): void {
  let newAnimation: IdleAnimation | WalkingAnimation | CrouchAnimation | FlyingAnimation | null;
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
  <div class="relative aspect-3/4 w-full max-w-lg rounded-2xl border-2 border-slate-400 dark:border-slate-600" ref="skinCanvasContainer">
    <canvas ref="skinCanvas" class="absolute top-0 left-0"></canvas>
  </div>

  <div v-if="hasCape">
    <label v-for="(option, key) in equipmentOptions" :key="key">
      <input type="radio" :value="option.value" v-model="equipmentType" />
      {{ option.label }}
    </label>

    <p>Equipment type: {{ equipmentType }}</p>
  </div>

  <div>
    <label v-for="(option, key) in animationOptions" :key="key">
      <input type="radio" :value="option.value" v-model="animationType" />
      {{ option.label }}
    </label>

    <p>Animation type: {{ animationType }}</p>
  </div>

  <div>
    <label>
      <input type="checkbox" v-model="showOuterLayer" />
      Show outer layer
    </label>
    <p>Outer layer shown: {{ showOuterLayer }}</p>
  </div>
</template>
