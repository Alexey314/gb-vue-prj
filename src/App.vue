<template>
  <div id="app">
    <h1>My personal costs</h1>
    <button class="add-btn add-btn_mb" @click="toggleInputFormVisible">
      ADD NEW COST +
    </button>
    <cost-input-form v-show="showInputForm" @add="onAddCost" />
    <costs-list :costs-list="costsListPaginated" />
    <paginator-widget
      v-show="costs.length > maxCostsListPageLength"
      :page-count="costsListPages"
      :page-num="costsListPageNum"
      @change-page="onChangePage"
    />
  </div>
</template>

<script>
import CostInputForm from "./components/CostInputForm.vue";
import CostsList from "./components/CostsList.vue";
import PaginatorWidget from "./components/PaginatorWidget.vue";

export default {
  name: "App",
  components: {
    CostInputForm,
    CostsList,
    PaginatorWidget,
  },
  data: () => ({
    showInputForm: false,
    costs: [],
    maxCostsListPageLength: 5,
    costsListPageNum: 1,
  }),
  methods: {
    toggleInputFormVisible() {
      this.showInputForm = !this.showInputForm;
    },
    onAddCost(newCost) {
      const newCostsRec = Object.assign({}, newCost);
      const newCostsIndex = this.costs.length;
      newCostsRec.index = newCostsIndex + 1;
      this.$set(this.costs, newCostsIndex, newCostsRec);
      this.costsListPageNum = this.costsListPages;
    },
    onChangePage(pageNum) {
      this.costsListPageNum = pageNum;
    },
  },
  computed: {
    costsListPages() {
      return Math.max(
        1,
        Math.ceil(this.costs.length / this.maxCostsListPageLength)
      );
    },
    costsListPaginated() {
      const startIndex = (this.costsListPageNum - 1) * this.maxCostsListPageLength;
      return this.costs.slice(startIndex, startIndex + this.maxCostsListPageLength);
    },
  },
};
</script>

<style lang="scss">
@import "./components/scss/_variables.scss";
@import "./components/scss/_mixins.scss";

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: $text-color-main;
  margin-top: 60px;
}

.add-btn {
  @include btn-decoration;
  &_mb {
    margin-bottom: $el-space;
  }
}
</style>
