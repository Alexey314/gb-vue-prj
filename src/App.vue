<template>
  <div id="app">
    <header>
      <h1>My personal costs</h1>
    </header>
    <router-view></router-view>
    <ModalWindow
      v-if="modalWindow"
      :modalWindow="modalWindow"
      :modalWindowSettings="modalWindowSettings"
    />
  </div>
</template>

<script>
import ModalWindow from "./components/ModalWindow";

export default {
  name: "App",
  components: {
    ModalWindow,
  },
  data() {
    return {
      modalWindow: "",
      modalWindowSettings: {},
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
  },
  mounted() {
    this.$modal.EventBus.$on("show", this.onModalWindowShow);
    this.$modal.EventBus.$on("hide", this.onModalWindowHide);
    // this.$modal.show("CostInputForm");
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
</style>
