<template>
  <div :class="[$style.root]">
    <costs-list :costs-list="costsListPaginated" />
    <div class="text-center pt-2">
      <v-pagination v-model="currentPage" :length="costsListPageCount"></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CostsList from "./CostsList.vue";

export default {
  components: {
    CostsList,
  },
  data: () => ({
    currentPage: 1,
  }),
  methods: {
    ...mapActions(["fetchData"]),
    ...mapGetters([
      "getCostsPageData",
      "getCostsListPageCount",
    ]),
    toggleInputFormVisible() {
      this.showInputForm = !this.showInputForm;
    },
    onChangePage(pageNum) {
      this.fetchData(pageNum);
    },
  },
  computed: {
    costsListPageCount() {
      return this.getCostsListPageCount();
    },
    costsListPaginated() {
      return this.getCostsPageData()(this.currentPage);
    },
  },
  mounted: function () {
    this.fetchData(1);
  },
  watch: {
    currentPage(val) {
      this.onChangePage(val);
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
