import { createRouter, createWebHistory } from 'vue-router';
import { usePlayerStore } from '@/stores/player';
import HomeView from '../views/HomeView.vue';

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
          component: () => import('../views/PlayersView.vue'),
        },
        {
          path: ':playerName',
          name: 'playerInfo',
          component: () => import('../views/PlayerInfoView.vue'),
          beforeEnter: async (to) => {
            const playerStore = usePlayerStore();

            if (to.params.playerName === playerStore.data?.name) {
              return true;
            }

            playerStore.query = to.params.playerName;
            const newRoute = await playerStore.fetchPlayer();
            return newRoute;
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      meta: { title: 'Not Found' },
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  sensitive: true,
});

router.afterEach((to) => {
  const baseTitle = 'mc-inspect';
  let routeTitle = to.meta.title;

  if (to.name === 'playerInfo') {
    routeTitle = to.params.playerName;
  }

  document.title = routeTitle ? `${routeTitle} | ${baseTitle}` : baseTitle;
});

export default router;
