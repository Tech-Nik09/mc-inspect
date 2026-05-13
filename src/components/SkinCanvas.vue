<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useElementSize } from '@vueuse/core';
import { SkinViewer, IdleAnimation, WalkingAnimation, CrouchAnimation, FlyingAnimation, PlayerAnimation } from 'skinview3d';

const playerStore = usePlayerStore();
const { data } = storeToRefs(playerStore);

const skinCanvas = useTemplateRef('skinCanvas');
const skinCanvasContainer = useTemplateRef('skinCanvasContainer');
const { width, height } = useElementSize(skinCanvasContainer);
let skinViewer: SkinViewer;

const showOuterLayer = ref(true);

type EquipmentOptions = { [key: string]: { equipment: null | string; label: string } };
const equipmentOptions = {
  noEquipment: { equipment: null, label: 'None' },
  cape: { equipment: 'cape', label: 'Cape' },
  elytra: { equipment: 'elytra', label: 'Elytra' },
} as const satisfies EquipmentOptions;

type AnimationOptions = { [key: string]: { animation: null | PlayerAnimation; label: string } };
const animationOptions = {
  noAnimation: { animation: null, label: 'None' },
  idle: { animation: new IdleAnimation(), label: 'Idle' },
  walking: { animation: new WalkingAnimation(), label: 'Walk' },
  crouching: { animation: Object.assign(new CrouchAnimation(), { runOnce: true }), label: 'Crouch' },
  flying: { animation: new FlyingAnimation(), label: 'Fly' },
} as const satisfies AnimationOptions;

type EquipmentKey = keyof typeof equipmentOptions;
const equipmentKey = ref<EquipmentKey>('cape');

type AnimationKey = keyof typeof animationOptions;
const animationKey = ref<AnimationKey>('idle');

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
    [data, equipmentKey],
    ([newData, newEquipmentKey]) => {
      if (!newData) return;

      skinViewer.loadSkin(newData.skinUrl);

      const backEquipment = equipmentOptions[newEquipmentKey].equipment;
      if (backEquipment && newData.capeUrl) {
        skinViewer.loadCape(newData.capeUrl, { backEquipment });
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
    animationKey,
    (newAnimationKey) => {
      skinViewer.animation = animationOptions[newAnimationKey].animation;
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
  <div class="flex w-full max-w-lg flex-col gap-4 sm:w-xl sm:max-w-xl sm:min-w-xl">
    <div class="relative aspect-3/4 sm:aspect-square" ref="skinCanvasContainer">
      <canvas
        ref="skinCanvas"
        class="absolute top-0 left-0 rounded-2xl border-2 border-slate-400 bg-gray-200 dark:border-slate-600 dark:bg-gray-900"
      ></canvas>
    </div>

    <div class="flex flex-col gap-4 rounded-2xl border-2 border-slate-400 bg-gray-200 p-4 dark:border-slate-600 dark:bg-gray-900">
      <template v-if="data?.capeUrl">
        <div>
          <p class="mb-2 text-center font-mono text-xl">Equipment</p>

          <div class="flex w-full flex-col gap-2 sm:grid sm:grid-cols-3">
            <label v-for="(option, key) in equipmentOptions" :key :class="key === equipmentKey ? 'radio-primary' : 'btn-reverse'">
              <input type="radio" :value="key" v-model="equipmentKey" class="hidden" />
              {{ option.label }}
            </label>
          </div>
        </div>

        <hr class="h-0.5 w-full bg-slate-400 text-slate-400 dark:bg-slate-600 dark:text-slate-600" />
      </template>

      <div>
        <p class="mb-2 text-center font-mono text-xl">Animation</p>

        <div class="flex w-full flex-col gap-2 sm:grid sm:grid-cols-5">
          <label v-for="(option, key) in animationOptions" :key :class="key === animationKey ? 'radio-primary' : 'btn-reverse'">
            <input type="radio" :value="key" v-model="animationKey" class="hidden" />
            {{ option.label }}
          </label>
        </div>
      </div>

      <hr class="h-0.5 w-full bg-slate-400 text-slate-400 dark:bg-slate-600 dark:text-slate-600" />

      <div>
        <p class="mb-2 text-center font-mono text-xl">Outer layer</p>

        <label :class="showOuterLayer ? 'radio-primary' : 'radio-reverse'" class="w-full">
          <input type="checkbox" v-model="showOuterLayer" class="hidden" />
          {{ showOuterLayer ? 'Hide outer layer' : 'Show outer layer' }}
        </label>
      </div>
    </div>
  </div>
</template>
