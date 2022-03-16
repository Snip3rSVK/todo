import { createRouter, createWebHistory } from "vue-router";
import TodoListView from "@/views/TodoListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/lists/1",
    },
    {
      path: "/lists/:id",
      name: "lists",
      component: TodoListView,
    },
  ],
});

export default router;
