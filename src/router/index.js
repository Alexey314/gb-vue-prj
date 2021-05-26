import Vue from "vue";
import Router from "vue-router";
import PageDashboard from "../pages/PageDashboard.vue";
import PageNotFound from "../pages/PageNotFound.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      //   name: "Dashboard",
      component: PageDashboard,
    },
    {
      path: "/dashboard/:page",
      //   name: "Dashboard",
      component: PageDashboard,
    },
    {
      path: "/add/payment/:category",
      name: "addPaymentPreset",
      component: PageDashboard,
    },
    {
      path: "/add/payment*",
      name: "addPaymentManual",
      component: PageDashboard,
    },
    {
      path: "*",
      //   name: "Dashboard",
      component: PageNotFound,
    },
  ],
});

router.afterEach((to, from) => {
  console.log(from, "->", to);
  console.log(router.params);
  console.log(router.query);
});

export default router;
