<template>
  <div :class="[$style.root]">
    <input
      :class="[$style.input]"
      type="text"
      placeholder="Payment description"
      v-model.trim="paymentDescription"
    />
    <input
      :class="[$style.input]"
      type="text"
      placeholder="Payment amount"
      v-model.number="paymentAmount"
    />
    <input
      :class="[$style.input]"
      type="text"
      placeholder="Payment date"
      v-model.trim="paymentDate"
    />
    <button :class="[$style.addBtn]" @click="onClickAdd">
      <span :class="[$style.addBtnText]">ADD</span>+
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    paymentDescription: "Buy food",
    paymentAmount: 123.4,
    paymentDate: "23.04.2021",
  }),
  methods: {
    onClickAdd() {
      this.$emit("add", {
        paymentDescription: this.paymentDescription,
        paymentAmount: this.paymentAmount,
        paymentDate: this.paymentDate,
      });
    },
  },
};
</script>

<style module lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";

.root {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.input {
  display: block;
  width: 100%;
  padding: $input-padding;
  margin-bottom: $el-space;
  border: $input-border;
  border-radius: $input-border-radius;
  color: $text-color-main;
  outline: none;
}

.addBtn {
  @include btn-decoration;
  &Text {
    padding-left: 32px;
    padding-right: 32px;
  }
}
</style>