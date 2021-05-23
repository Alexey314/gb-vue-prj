<template>
  <div :class="[$style.root]">
    <select :class="[$style.input]" v-model="paymentDescription">
      <option disabled value="">Please select payment description</option>
      <option v-for="cat in costsCategories" :key="cat">{{ cat }}</option>
      <option value="000">enter new payment description below</option>
    </select>
    <input
      v-if="paymentDescription === '000'"
      :class="[$style.input]"
      type="text"
      placeholder="Payment description"
      v-model.trim="newPaymentDescription"
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
    newPaymentDescription: "",
    paymentAmount: null,
    paymentDate: "",
  }),
  methods: {
    ...mapMutations(["addNewCost", "addCostsCategories"]),
    onClickAdd() {
      this.addNewCost({
        category: this.actualPaymentDescription,
        value: this.paymentAmount,
        date: this.paymentDate,
      });
      if (this.isNewPaymentDescription) {
        this.addCostsCategories([this.newPaymentDescription]);
      }
    },
  },
  computed: {
    isInputsValid() {
      return (
        this.actualPaymentDescription &&
        !Number.isNaN(+this.paymentAmount) &&
        typeof this.paymentAmount === "number" &&
        this.paymentDate
      );
    },
    costsCategories() {
      return this.$store.getters.getCostsCategories;
    },
    actualPaymentDescription() {
      return this.paymentDescription === "000"
        ? this.newPaymentDescription
        : this.paymentDescription;
    },
    isNewPaymentDescription() {
      return this.paymentDescription === "000";
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