<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn plain :ripple="false" to="/dashboard">Dashboard</v-btn>
      <v-btn plain :ripple="false" to="/about">About</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
      <transition name="fade">
        <ModalWindow
          v-if="modalWindow"
          :modalWindow="modalWindow"
          :modalWindowSettings="modalWindowSettings"
        />
      </transition>
    </v-main>
    <transition name="fade">
      <ContextMenu
        v-if="contextMenuSettings"
        :menuSettings="contextMenuSettings"
      />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    ModalWindow: () => import("./components/ModalWindow"),
    ContextMenu: () => import("./components/ContextMenu"),
  },
  data() {
    return {
      modalWindow: "",
      modalWindowSettings: {},
      contextMenuSettings: null,
    };
  },
  methods: {
    onModalWindowShow(settings) {
      console.log("App.onModalWindowShow", settings);
      this.modalWindow = settings.name;
      this.modalWindowSettings = settings;
    },
    onModalWindowHide() {
      console.log("App.onModalWindowHide");
      this.modalWindow = "";
      this.modalWindowSettings = {};
    },
    onContextMenuShow(settings) {
      console.log("App.onContextMenuShow", settings);
      this.contextMenuSettings = settings;
    },
    onContextMenuHide() {
      console.log("App.onContextMenuHide");
      this.contextMenuSettings = null;
    },
  },
  mounted() {
    this.$modal.EventBus.$on("show", this.onModalWindowShow);
    this.$modal.EventBus.$on("hide", this.onModalWindowHide);
    this.$contextMenu.EventBus.$on("show", this.onContextMenuShow);
    this.$contextMenu.EventBus.$on("hide", this.onContextMenuHide);
  },
};
</script>
