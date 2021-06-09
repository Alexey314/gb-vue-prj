<template>
  <v-dialog v-model="modalWindow" width="500">
    <v-card>
      <v-card-title>{{ modalWindowSettings.header }}</v-card-title>
      <div :class="[$style.content]">
        <component :is="modalWindow" :settings="modalWindowSettings" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {
    CostInputForm: () => import("./CostInputForm"),
  },
  props: {
    modalWindow: String,
    modalWindowSettings: Object,
  },
};
</script>

<style module lang="scss">
@import "../components/scss/_variables.scss";
@import "../components/scss/_mixins.scss";

.content {
  padding: 8px;
  background-color: $bg-color-modal;
}

</style>
