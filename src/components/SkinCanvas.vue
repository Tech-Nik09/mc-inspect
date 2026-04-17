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

const equipmentOptions = {
  noEquipment: { value: null, label: 'No equipment' },
  cape: { value: 'cape', label: 'Cape' },
  elytra: { value: 'elytra', label: 'Elytra' },
} as const;
type EquipmentStyle = (typeof equipmentOptions)[keyof typeof equipmentOptions]['value'];
const equipmentStyle = ref<EquipmentStyle>('cape');

const animationOptions = {
  noAnimation: {
    value: {
      setAnimation(): void {
        skinViewer.animation = null;
      },
    },
    label: 'No animation',
  },
  idle: {
    value: {
      setAnimation(): void {
        skinViewer.animation = new IdleAnimation();
      },
    },
    label: 'Idle',
  },
  walking: {
    value: {
      setAnimation(): void {
        skinViewer.animation = new WalkingAnimation();
      },
    },
    label: 'Walk',
  },
  crouching: {
    value: {
      setAnimation(): void {
        const newAnimation = new CrouchAnimation();
        newAnimation.runOnce = true;
        skinViewer.animation = newAnimation;
      },
    },
    label: 'Crouch',
  },
  flying: {
    value: {
      setAnimation(): void {
        skinViewer.animation = new FlyingAnimation();
      },
    },
    label: 'Fly',
  },
} as const;
type AnimationStyle = (typeof animationOptions)[keyof typeof animationOptions]['value'];
const animationStyle = ref<AnimationStyle>({
  setAnimation() {
    skinViewer.animation = new IdleAnimation();
  },
});

onMounted(() => {
  if (!skinCanvas.value) return;

  skinViewer = new SkinViewer({
    canvas: skinCanvas.value,
    width: width.value || 300,
    height: height.value || 400,
    zoom: 0.7,
  });
  skinViewer.controls.enableZoom = false;

  watch(
    [data, equipmentStyle],
    ([newData, newEquipmentStyle]) => {
      if (!newData) return;

      skinViewer.loadSkin(newData.skinUrl);

      if (newEquipmentStyle && newData.capeUrl) {
        skinViewer.loadCape(newData.capeUrl, { backEquipment: newEquipmentStyle });
      } else {
        skinViewer.loadCape(null);
      }

      if (newData.name === 'deadmau5') {
        skinViewer.loadEars(newData.skinUrl, { textureType: 'skin' });
      } else {
        skinViewer.loadEars(null);
      }
    },
    { immediate: true },
  );

  watch(
    animationStyle,
    (newAnimationStyle) => {
      newAnimationStyle.setAnimation();
    },
    { immediate: true },
  );

  watch([width, height], ([newWidth, newHeight]) => {
    skinViewer.setSize(newWidth, newHeight);
  });

  watchEffect(() => {
    skinViewer.playerObject.skin.setOuterLayerVisible(showOuterLayer.value);
  });
});

onBeforeUnmount(() => {
  skinViewer.dispose();
});
</script>

<template>
  <div class="relative aspect-3/4 w-full max-w-lg rounded-2xl border-2 border-slate-400 dark:border-slate-600" ref="skinCanvasContainer">
    <canvas ref="skinCanvas" class="absolute top-0 left-0"></canvas>
  </div>

  <div v-if="data?.capeUrl">
    <label v-for="(option, key) in equipmentOptions" :key>
      <input type="radio" :value="option.value" v-model="equipmentStyle" />
      {{ option.label }}
    </label>

    <p>Equipment type: {{ equipmentStyle }}</p>
  </div>

  <div>
    <label v-for="(option, key) in animationOptions" :key>
      <input type="radio" :value="option.value" v-model="animationStyle" />
      {{ option.label }}
    </label>

    <p>Animation type: {{ animationStyle }}</p>
  </div>

  <div>
    <label>
      <input type="checkbox" v-model="showOuterLayer" />
      Show outer layer
    </label>
    <p>Outer layer shown: {{ showOuterLayer }}</p>
  </div>
</template>
