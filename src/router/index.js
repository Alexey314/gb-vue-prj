import Vue from "vue";
import Router from "vue-router";
import PageDashboard from "../pages/PageDashboard.vue";

Vue.use(Router);

export default new Router({
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
    //   name: "Dashboard",
      component: PageDashboard,
    },
  ],
});
