import { usePlayerStore } from '@/stores/player';
import HomeView from '../views/HomeView.vue';
import { createRouter, createWebHistory, type RouteLocationNamedRaw, type RouteLocationNormalizedGeneric } from 'vue-router';

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
          path: ':playerName',
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
});

async function handlePlayerRoute(to: RouteLocationNormalizedGeneric): Promise<true | RouteLocationNamedRaw> {
  const playerStore = usePlayerStore();

  const playerName = (Array.isArray(to.params.playerName) ? to.params.playerName[0] : to.params.playerName) ?? '';

  if (playerName === playerStore.data?.name) return true;

  playerStore.query = playerName;
  const newRoute = await playerStore.fetchPlayer();
  return newRoute;
}

function setTitle(to: RouteLocationNormalizedGeneric): void {
  const baseTitle = 'mc-inspect';
  let routeTitle: string | null = typeof to.meta.title === 'string' ? to.meta.title : null;
  if (to.name === 'playerInfo') routeTitle = (Array.isArray(to.params.playerName) ? to.params.playerName[0] : to.params.playerName) ?? null;

  document.title = routeTitle ? `${routeTitle} | ${baseTitle}` : baseTitle;
}

export default router;
