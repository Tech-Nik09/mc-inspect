import { createRouter, createWebHistory } from 'vue-router';
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
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
  sensitive: true,
});

export default router;
