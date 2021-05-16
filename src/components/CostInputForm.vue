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
    <button :class="[$style.addBtn]" @click="onClickAdd">ADD +</button>
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


.root {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.input {
  display: block;
  width: 100%;
  padding: 8px;
  margin-top: 8px;
}

.addBtn {
  display: block;
  width: max-content;
  background-color: $btn-bg-color-main;
  border: none;
  color: $btn-color-main;
  padding: 8px;
  margin-top: 8px;
  cursor: pointer;
  &:hover {
    background-color: $btn-bg-color-hover;
  }
  &:active {
    background-color: $btn-bg-color-active;
  }
}
</style>