<template>
  <div id="app">
    <h1>My personal costs</h1>
    <button class="add-btn" @click="toggleInputFormVisible">
      ADD NEW COST +
    </button>
    <cost-input-form v-show="showInputForm" @add="onAddCost" />
    <costs-list :costs-list="costsListPaginated" />
    <paginator-widget
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
    maxCostsListLength: 5,
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
        Math.ceil(this.costs.length / this.maxCostsListLength)
      );
    },
    costsListPaginated() {
      const startIndex = (this.costsListPageNum - 1) * this.maxCostsListLength;
      return this.costs.slice(startIndex, startIndex + this.maxCostsListLength);
    },
  },
};
</script>

<style lang="scss">
@import "./components/scss/_variables.scss";

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

.add-btn {
  display: block;
  background-color: $btn-bg-color-main;
  border: none;
  color: $btn-color-main;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: $btn-bg-color-hover;
  }
  &:active {
    background-color: $btn-bg-color-active;
  }
}
</style>
