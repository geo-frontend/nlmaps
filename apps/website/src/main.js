import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: 'Home', description: 'Dé officiële kaart van Nederland' },
  },
  {
    path: '/docs',
    component: () => import('@/pages/DocsPage.vue'),
    meta: {
      title: 'Docs',
      description: 'NL Maps Library',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
