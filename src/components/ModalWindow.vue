<template>
  <div :class="wrapper">
    <div :class="header">{{ modalWindowSettings.header }}</div>
    <div :class="content">
      <component :is="modalWindow" />
    </div>
    <div :class="footer">
      <button @click="$modal.hide()">Close</button>
    </div>
  </div>
</template>

<script>
// import AddPaymentForm from "./CostInputForm";

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
