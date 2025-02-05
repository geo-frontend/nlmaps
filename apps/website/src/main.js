import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from "vue-router";
import App from './App.vue'

const routes = [
    { path: "/", component: () => import("@/pages/HomePage.vue") },
    { path: "/docs", component: () => import("@/pages/DocsPage.vue") },
  ];
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  
  const app = createApp(App);
  
  app.use(router);
  
  app.mount("#app");

