import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

import Dashboard from "@/views/Dashboard";
import LoginSignup from "@/views/LoginSignup";
import LoginForm from "@/components/Forms/LoginForm";
import SignupForm from "@/components/Forms/SignupForm";
import NotFound from "@/views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "",
    component: LoginSignup,
    children: [
      {
        path: "/login",
        component: LoginForm
      },
      {
        path: "/signup",
        component: SignupForm
      }
    ]
  },
  {
    path: "/logout",
    redirect: () => {
      store.commit("auth/logout");

      return "/login";
    }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters["auth/isLoggedIn"]) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
