<template>
  <div :class="[$style.wrapper]">
    <div :class="[$style.header]">{{ modalWindowSettings.header }}</div>
    <div :class="[$style.content]">
      <component :is="modalWindow" :settings="modalWindowSettings" />
    </div>
    <div :class="[$style.footer]">
      <!-- <button @click="$modal.hide()">Close</button> -->
    </div>
  </div>
</template>

<script>
// import AddPaymentForm from "./CostInputForm";

export default {
  components: {
    CostInputForm: () => import("./CostInputForm"),
    ContextMenu: () => import("./ContextMenu"),
  },
  props: {
    modalWindow: String,
    modalWindowSettings: Object,
  },
  mounted() {
    // this.$el.style.top = 0 + "px";
    // this.$el.style.left = 0 + "px";
  },
};
</script>

<style module lang="scss">
@import "../components/scss/_variables.scss";
@import "../components/scss/_mixins.scss";

.wrapper {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%,-50%);
  padding: 8px;
  background-color: $bg-color-modal;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  z-index: 101;
}

.header {
}

.content {
  padding: 8px;
  background-color: $bg-color-modal;
}

.footer {
}
</style>