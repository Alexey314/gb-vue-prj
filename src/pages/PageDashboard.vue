<template>
  <v-container>
    <v-row>
    <v-col>
      <v-btn color="teal" dark @click="toggleInputFormVisible">
        ADD NEW COST <v-icon>mdi-plus</v-icon>
      </v-btn>
      <cost-input-form
        v-show="showInputForm"
        :settings="{ formButtons: ['add'] }"
      />
      <paginated-costs-list />
    </v-col>
    <v-col class="costs-visualization">TBD</v-col>
    </v-row>
  </v-container>
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
