<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form ref="form" class="justify-end" v-model="valid" lazy-validation>
          <v-select
            v-model="selectPaymentDescription"
            :items="costsCategories"
            :rules="[(v) => !!v || 'Item is required']"
            label="Please select payment description"
            required
          ></v-select>

          <v-text-field
            v-if="selectPaymentDescription === enterNewCategoryText"
            v-model="inputPaymentDescription"
            :rules="emailRules"
            label="Payment description"
            required
          ></v-text-field>

          <v-text-field
            v-model="paymentAmount"
            :rules="nameRules"
            label="Payment amount"
            required
          ></v-text-field>

          <v-text-field
            v-model="paymentDate"
            :rules="emailRules"
            label="Payment date"
            required
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right">
        <v-btn
          v-if="needShowBtnAdd"
          color="teal"
          dark
          @click="onClickAdd"
          :disabled="!isInputsValid"
          class="ml-4"
        >
          ADD <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn
          v-if="needShowBtnSave"
          color="teal"
          dark
          @click="onClickSave"
          :disabled="!isInputsValid"
          class="ml-4"
        >
          SAVE
        </v-btn>

        <v-btn
          v-if="needShowBtnClose"
          color="teal"
          dark
          @click="onClickClose"
          class="ml-4"
        >
          CLOSE
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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
    id: null,
    enterNewCategoryText: "Enter new payment description below",
  }),
  methods: {
    ...mapMutations(["addCostsCategories"]),
    ...mapActions(["fetchCategories", "postData"]),
    onClickAdd() {
      this.postData({
        id: this.id,
        category: this.actualPaymentDescription,
        value: this.paymentAmount,
        date: this.paymentDate,
      });
      if (this.isNewPaymentDescription) {
        this.addCostsCategories([this.inputPaymentDescription]);
      }
    },
    onClickSave() {
      this.onClickAdd();
      this.$modal.hide();
    },
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
        this.paymentDate
      );
    },
    costsCategories() {
      return [
        ...this.$store.getters.getCostsCategories,
        this.enterNewCategoryText,
      ];
    },
    actualPaymentDescription() {
      return this.selectPaymentDescription === this.enterNewCategoryText
        ? this.inputPaymentDescription
        : this.selectPaymentDescription;
    },
    isNewPaymentDescription() {
      return this.selectPaymentDescription === this.enterNewCategoryText;
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
      this.selectPaymentDescription = this.enterNewCategoryText;
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
