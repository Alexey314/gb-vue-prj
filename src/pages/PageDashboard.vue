<template>
  <main class="main">
    <section class="costs-operation">
      <button class="add-btn add-btn_mb" @click="toggleInputFormVisible">
        ADD NEW COST +
      </button>
      <cost-input-form v-show="showInputForm" />
      <paginated-costs-list />
    </section>
    <section class="costs-visualization">TBD</section>
  </main>
</template>

<script>
import CostInputForm from "../components/CostInputForm.vue";
import PaginatedCostsList from "../components/PaginatedCostsList.vue";

export default {
  components: {
    CostInputForm,
    PaginatedCostsList,
  },
  data: () => ({
    showInputForm: false,
    maxCostsListPageLength: 5,
    costsListPageNum: 1,
  }),
  methods: {
    toggleInputFormVisible() {
      this.showInputForm = !this.showInputForm;
    },
  },
  computed: {},
  mounted() {
    if (
      this.$route.name === "addPaymentPreset" ||
      this.$route.name === "addPaymentManual"
    ) {
      this.showInputForm = true;
    }
  },
};
</script>

<style lang="scss">
@import "../components/scss/_variables.scss";
@import "../components/scss/_mixins.scss";

.main {
  width: 100%;
  display: flex;
}

.costs-operation {
  flex-basis: 50%;
  margin-right: $el-space;
}

.costs-visualization {
  flex-basis: 50%;
  margin-left: $el-space;
  background-color: lightgray;
}

.add-btn {
  @include btn-decoration;
  &_mb {
    margin-bottom: $el-space;
  }
}
</style>