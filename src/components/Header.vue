<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import ThemeSelection from '@/components/ThemeSelection.vue';
import { computed, ref } from 'vue';
import { type RouteLocationNamedRaw } from 'vue-router';
import { useToggle } from '@vueuse/core';
import { OnClickOutside } from '@vueuse/components';
import MdiGithub from '~icons/mdi/github';

const playerStore = usePlayerStore();

const isLoading = computed<boolean>(() => playerStore.isLoading);

type Tab = {
  route: RouteLocationNamedRaw;
  label: string;
} & { route: { name: string } };

const tabs: Tab[] = [
  { route: { name: 'home' }, label: 'Home' },
  { route: { name: 'players' }, label: 'Skinviewer' },
] as const;

const [isDropdownOpen, toggleDropdown] = useToggle();
</script>

<template>
  <header
    class="sticky top-0 flex h-12 items-center gap-2 border-b-2 border-slate-400 px-2 font-sans font-bold backdrop-blur-md sm:h-16 sm:gap-4 sm:px-4 dark:border-slate-600"
    :class="{ 'loading-bar': isLoading }"
  >
    <nav class="hidden sm:contents">
      <router-link
        v-for="tab in tabs"
        :key="tab.route.name"
        :to="tab.route"
        class="router-link-lg relative transition-colors hover-smooth hover:text-accent"
        >{{ tab.label }}</router-link
      >
    </nav>
    <nav class="relative grow sm:hidden">
      <OnClickOutside @trigger="toggleDropdown(false)">
        <button @click="toggleDropdown()" class="h-8 w-full cursor-pointer rounded-full bg-slate-200 dark:bg-slate-800">Menu</button>

        <div v-if="isDropdownOpen" class="absolute top-9 left-0 flex w-full flex-col gap-1">
          <router-link
            v-for="tab in tabs"
            :key="tab.route.name"
            :to="tab.route"
            @click="toggleDropdown(false)"
            class="router-link-sm flex h-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800"
          >
            {{ tab.label }}
          </router-link>
        </div>
      </OnClickOutside>
    </nav>

    <a href="https://github.com/nkmLABS/mc-inspect" target="_blank" class="ml-auto size-fit">
      <MdiGithub class="size-8 rounded-full transition-colors hover-smooth hover:text-accent" />
    </a>

    <ThemeSelection />
  </header>
</template>

<style scoped>
@reference '@/assets/main.css';

.router-link-lg::after,
.router-link-active.router-link-lg::after {
  content: '';
  @apply absolute -bottom-1 left-1/2 h-1 w-0 rounded-full bg-accent transition-[width,left] hover-smooth;
}
.router-link-lg:hover::after,
.router-link-active.router-link-lg::after {
  @apply left-0 w-full;
}

.router-link-active.router-link-sm {
  @apply bg-accent text-white;
}

.loading-bar::after {
  content: '';
  @apply absolute -bottom-0.5 h-0.5 animate-loading rounded-full bg-accent;
}
</style>
