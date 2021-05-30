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
    <div :class="[$style.cmdBtnWrapper]">
      <button
        v-if="needShowBtnAdd"
        :class="[$style.cmdBtn]"
        @click="onClickAdd"
        :disabled="!isInputsValid"
      >
        <span :class="[$style.addBtnText]">ADD</span>+
      </button>
      <button
        v-if="needShowBtnSave"
        :class="[$style.cmdBtn]"
        @click="onClickSave"
        :disabled="!isInputsValid"
      >
        <span :class="[$style.addBtnText]">SAVE</span>
      </button>
      <button
        v-if="needShowBtnClose"
        :class="[$style.cmdBtn]"
        @click="onClickClose"
      >
        <span :class="[$style.addBtnText]">CLOSE</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  props: {
    settings: Object,
  },
  data: () => ({
    selectPaymentDescription: "",
    inputPaymentDescription: "",
    paymentAmount: null,
    paymentDate: "",
    id: Number,
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
    onClickSave() {},
    onClickClose() {
      this.$modal.hide();
    },
  },
  computed: {
    needShowBtnAdd() {
      return this.settings.formButtons.includes("add");
    },
    needShowBtnSave() {
      return this.settings.formButtons.includes("save");
    },
    needShowBtnClose() {
      return this.settings.formButtons.includes("close");
    },
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
    if (this.settings.formData) {
      this.selectPaymentDescription = this.settings.formData.category;
      this.inputPaymentDescription = this.settings.formData.category;
      this.paymentAmount = this.settings.formData.value;
      this.paymentDate = this.settings.formData.date;
      this.id = this.settings.formData.id;
    }
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

.cmdBtn {
  margin-left: 8px;
  @include btn-decoration;
  &Text {
    padding-left: 32px;
    padding-right: 32px;
  }
}

.cmdBtnWrapper {
  display: flex;
  flex-direction: row;
}
</style>