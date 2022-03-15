import { createRouter, createWebHistory } from "vue-router";
import ListView from "@/views/ListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/lists/:id",
      name: "lists",
      component: ListView,
    },
  ],
});

export default router;
