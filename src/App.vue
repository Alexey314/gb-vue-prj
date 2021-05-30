<template>
  <div id="app">
    <header>
      <h1>My personal costs</h1>
    </header>
    <router-view></router-view>
    <transition name="fade">
      <ModalWindow
        v-if="modalWindow"
        :modalWindow="modalWindow"
        :modalWindowSettings="modalWindowSettings"
      />
    </transition>
    <div v-show="modalWindow" id="page-mask">sfvc</div>
    <transition name="fade">
      <ContextMenu
        v-if="contextMenuSettings"
        :menuSettings="contextMenuSettings"
      />
    </transition>
  </div>
</template>

<script>
// import ModalWindow from "./components/ModalWindow";
// import ContextMenu from "./components/ContextMenu";

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

<style lang="scss">
@import "./components/scss/_variables.scss";
@import "./components/scss/_mixins.scss";

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: $text-color-main;
  margin-top: 60px;
  @include container-margins($container-width-desktop);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#page-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
</style>
