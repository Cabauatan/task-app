import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

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
      meta: {
        auth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/Auth/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/Auth/Register.vue"),
    },
  ],
});
// router.beforeEach((to, from) => {
//   if (to.meta.auth) {
//     const store = useAuthStore();
//     if (to.meta.auth && !store.isLoggedIn) {
//       return {
//         name: "login",
//         query: {
//           redirect: to.fullPath,
//         },
//       };
//     }
//   }
// });

export default router;
