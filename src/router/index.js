import { createRouter, createWebHistory } from 'vue-router';
import { usePlayerStore } from '@/stores/player';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/players',
      children: [
        {
          path: '',
          name: 'players',
          component: () => import('../views/PlayersView.vue'),
        },
        {
          path: ':playerName',
          name: 'playerInfo',
          component: () => import('../views/PlayerInfoView.vue'),
          beforeEnter: async (to) => {
            const store = usePlayerStore();

            if (to.params.playerName === store.data?.name) {
              return true;
            }

            store.query = to.params.playerName;
            await store.fetchPlayer();

            if (!store.error) {
              return { name: 'playerInfo', params: { playerName: store.data.name } };
            }

            return { name: 'players' };
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  sensitive: true,
});

export default router;
