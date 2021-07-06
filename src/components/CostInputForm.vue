<template>
  <div :class="[$style.root]">
    <select :class="[$style.input]" v-model="selectPaymentDescription">
      <option disabled value="">Please select payment description</option>
      <option v-for="cat in costsCategories" :key="cat">{{ cat }}</option>
      <option value="000">enter new payment description below</option>
    </select>
    <input
      v-if="selectPaymentDescription === '000'"
      :class="[$style.input]"
      type="text"
      placeholder="Payment description"
      v-model.trim="inputPaymentDescription"
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
import { mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    selectPaymentDescription: "",
    inputPaymentDescription: "",
    paymentAmount: null,
    paymentDate: "",
  }),
  methods: {
    ...mapMutations(["addCostsCategories"]),
    ...mapActions(["fetchCategories", "postData"]),
    onClickAdd() {
      this.postData({
        category: this.actualPaymentDescription,
        value: this.paymentAmount,
        date: this.paymentDate,
      });
      if (this.isNewPaymentDescription) {
        this.addCostsCategories([this.inputPaymentDescription]);
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
      return this.selectPaymentDescription === "000"
        ? this.inputPaymentDescription
        : this.selectPaymentDescription;
    },
    isNewPaymentDescription() {
      return this.selectPaymentDescription === "000";
    },
  },
  mounted() {
    this.fetchCategories();
    if (this.$route.name === "addPaymentPreset") {
      this.selectPaymentDescription = "000";
      this.inputPaymentDescription = this.$route.params.category;
      this.paymentAmount = Number(this.$route.query.value);
      if (isNaN(this.paymentAmount)) {
        this.paymentAmount = "";
      }
      this.paymentDate = new Date(Date.now())
        .toLocaleString("ru-RU")
        .split(",")[0];
      if (this.isInputsValid) {
        this.onClickAdd();
      }
    }
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