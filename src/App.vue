<template>
  <div id="app">
    <header>
      <h1>My personal costs</h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  mounted() {
    console.log("App mounted");

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
