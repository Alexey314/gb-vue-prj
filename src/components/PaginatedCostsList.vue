<template>
  <div :class="[$style.root]">
    <costs-list :costs-list="costsListPaginated" />
    <paginator-widget
      v-show="costsListPageCount > 1"
      :page-count="costsListPageCount"
      :page-num="costsListPageNum"
      @change-page="onChangePage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CostsList from "./CostsList.vue";
import PaginatorWidget from "./PaginatorWidget.vue";

export default {
  components: {
    CostsList,
    PaginatorWidget,
  },
  data: () => ({
    costsListPageNum: 1,
  }),
  methods: {
    ...mapActions(["fetchData", "fetchDataStatus"]),
    ...mapGetters([
      "getCostsPageData",
      "getCostsListPageCount",
      "getCostsPerPageLimit",
      "getUserAddedCostCount",
    ]),
    toggleInputFormVisible() {
      this.showInputForm = !this.showInputForm;
    },
    onAddCost(/*newCost*/) {
      //   const newCostsRec = Object.assign({}, newCost);
      //   const newCostsIndex = this.costs.length;
      //   newCostsRec.index = newCostsIndex + 1;
      //   this.$set(this.costs, newCostsIndex, newCostsRec);
      //   this.costsListPageNum = this.costsListPageCount;
    },
    onChangePage(pageNum) {
      this.costsListPageNum = pageNum;
      this.fetchData(pageNum);
    },
  },
  computed: {
    costsListPageCount() {
      return this.getCostsListPageCount();
    },
    costsListPaginated() {
      return this.getCostsPageData()(this.costsListPageNum);
    },
    costsPerPageLimit() {
      return this.getCostsPerPageLimit();
    },
    userAddedCostCount() {
      return this.getUserAddedCostCount();
    },
  },
  mounted: function () {
    this.fetchDataStatus();
    this.fetchData(1);
  },
  watch: {
    userAddedCostCount() {
      this.costsListPageNum = this.costsListPageCount;
    },
  },
};
</script>

<style module lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";

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
  @include container-margins($container-width-desktop);
}

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
