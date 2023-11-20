import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../components/layout/Navbar.vue"),
    },
    {
      path: "/task",
      name: "task",
      component: () => import("@/views/Tasks.vue"),
    },
  ],
});

export default router;
