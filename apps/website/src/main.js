import { ViteSSG } from 'vite-ssg'
import App from './App.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/docs',
    component: () => import('@/pages/DocsPage.vue'),
  },
]

export const createApp = ViteSSG(App, { routes })
