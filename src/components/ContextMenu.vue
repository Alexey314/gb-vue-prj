<template>
  <div :class="[$style.wrapper]">
    <div
      v-for="(v, i) in menuSettings.items"
      :key="i"
      :class="[$style.menuItem]"
      @click="onClick(i)"
    >
      {{ v.text }}
    </div>
  </div>
</template>

<script>
// import AddPaymentForm from "./CostInputForm";

export default {
  props: {
    menuSettings: Object,
  },
  methods: {
    onClick(index) {
      this.$contextMenu.command(this.menuSettings, this.menuSettings.items[index].cmd);
    },
  },
  mounted() {
    this.$el.style.top = this.menuSettings.position.top + "px";
    this.$el.style.left = this.menuSettings.position.left + "px";
  },
};
</script>

<style module lang="scss">
@import "../components/scss/_variables.scss";
@import "../components/scss/_mixins.scss";

.wrapper {
  position: absolute;
  width: max-content;
  background-color: $bg-color-main;
  padding: 8px 0;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.menuItem {
  padding: 4px 8px;
  &:hover {
    background-color: $bg-color-menu-hover;
    cursor: pointer;
  }
}
</style>