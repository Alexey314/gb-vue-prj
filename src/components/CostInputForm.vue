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
    <button
      :class="[$style.addBtn]"
      @click="onClickAdd"
      :disabled="!isInputsValid"
    >
      <span :class="[$style.addBtnText]">ADD</span>+
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    paymentDescription: "",
    paymentAmount: null,
    paymentDate: "",
  }),
  methods: {
    ...mapMutations(['addNewCost']),
    onClickAdd() {
      this.addNewCost( {
        category: this.paymentDescription,
        value: this.paymentAmount,
        date: this.paymentDate,
      });
    },
  },
  computed: {
    isInputsValid() {
      return (
        this.paymentDescription &&
        !Number.isNaN(+this.paymentAmount) &&
        typeof this.paymentAmount === "number" &&
        this.paymentDate
      );
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