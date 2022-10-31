import { createRouter, createWebHistory } from "vue-router";
import AddTask from '../components/AddTask.vue';
import Home from '../components/HomeComponent.vue';
import ViewTask from '../components/ViewTask.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/add",
      name: "add",
      component: AddTask,
    },
    {
      path: "/task/:id",
      name: "viewtask",
      component: ViewTask,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: to => {
        return { path: "/", };
      }
    }
  ],
});

export default router;
