import Vue from "vue";
import App from "./App.vue";
import store from "./store.js";
import router from "./router";
import ModalWindowPlugin from "./plugins/ModalWindow/index.js";
import ContextMenuPlugin from "./plugins/ContextMenu/index.js";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(ModalWindowPlugin);
Vue.use(ContextMenuPlugin);

window.vue = new Vue({
  render: (h) => h(App),
  store,
  vuetify,
  router,
}).$mount("#app");
