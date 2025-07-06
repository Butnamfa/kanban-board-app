import { createRouter, createWebHistory } from "vue-router";

import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Layout from "../layouts/Layout.vue";
import Dashboard from "../pages/Dashboard.vue";
import BoardView from "../pages/BoardView.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/", // root path
    redirect: "/login", // ให้ redirect ไปหน้า login
  },
  {
    path: "/app", // ย้าย Layout ไป path /app
    component: Layout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "board/:id",
        name: "BoardView",
        component: BoardView,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
