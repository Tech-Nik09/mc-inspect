import { usePlayerStore } from '@/stores/player';
import HomeView from '../views/HomeView.vue';
import { createRouter, createWebHistory, type RouteLocationNamedRaw, type RouteLocationNormalizedGeneric } from 'vue-router';
import { useDateFormat, useNow } from '@vueuse/core';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Home' },
      component: HomeView,
    },
    {
      path: '/players',
      children: [
        {
          path: '',
          name: 'players',
          meta: { title: 'Skinviewer' },
          component: () => import('@/views/PlayersView.vue'),
        },
        {
          path: ':playerQuery',
          name: 'playerInfo',
          component: () => import('@/views/PlayerInfoView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      meta: { title: 'Not Found' },
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  sensitive: true,
});

router.beforeEach(async (to) => {
  if (to.name === 'playerInfo') return await handlePlayerRoute(to);
});

router.afterEach((to) => {
  setTitle(to);
  setFavicon(to);
});

async function handlePlayerRoute(to: RouteLocationNormalizedGeneric): Promise<true | RouteLocationNamedRaw> {
  const playerStore = usePlayerStore();

  const nameOrUuid = (Array.isArray(to.params.playerQuery) ? to.params.playerQuery[0] : to.params.playerQuery) ?? '';
  if (nameOrUuid === playerStore.data?.uuid) return true;

  playerStore.query = nameOrUuid;
  const newRoute = await playerStore.fetchPlayer();
  return newRoute;
}

function setTitle(to: RouteLocationNormalizedGeneric): void {
  const playerStore = usePlayerStore();

  const baseTitle = 'mc-inspect';
  let routeTitle: string | null = typeof to.meta.title === 'string' ? to.meta.title : null;
  if (to.name === 'playerInfo') routeTitle = playerStore.data?.name ?? null;

  document.title = routeTitle ? `${routeTitle} | ${baseTitle}` : baseTitle;
}

async function setFavicon(to: RouteLocationNormalizedGeneric): Promise<void> {
  const version = useDateFormat(useNow(), 'YYYYMMDD');
  const link = document.getElementById('dynamic-favicon');
  if (!(link instanceof HTMLLinkElement)) return;

  let icon = `/favicon.svg?v=${version.value}`;
  let type = 'image/svg+xml';
  let sizes: string | null = null;

  if (to.name === 'playerInfo') {
    const nameOrUuid = (Array.isArray(to.params.playerQuery) ? to.params.playerQuery[0] : to.params.playerQuery) ?? '';
    const url = `https://render.crafty.gg/2d/head/${nameOrUuid}?size=96`;

    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) {
        icon = `${url}&v=${version.value}`;
        type = res.headers.get('Content-Type') || 'image/png';
        sizes = '96x96';
      }
    } catch (err) {
      console.error(`Error while loading favicon from URL "${url}": ${err}`);
    }
  }

  if (sizes) link.setAttribute('sizes', sizes);
  else link.removeAttribute('sizes');
  link.type = type;
  link.href = icon;
}

export default router;
