import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/wallets', component: () => import('pages/WalletsPage.vue') },
      { path: '/download', component: () => import('pages/DownloadPage.vue') },
      {
        path: '/operations',
        component: () => import('pages/OperationsPage.vue'),
      },
      { path: '/about', component: () => import('pages/AboutPage.vue') },
      { path: '/total', component: () => import('pages/WalletsTotal.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
