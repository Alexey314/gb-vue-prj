<template>
  <div :class="[$style.root]">
    <costs-list :costs-list="pageData" />
    <div class="text-center pt-2">
      <v-pagination
        :value="currentPage"
        :length="pageCount"
        @input="$emit('changePage', $event)"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
// import { FETCH_PAYMENTS_DATA } from "../action-types";
import { mapGetters } from "vuex";
import CostsList from "./CostsList.vue";

export default {
  components: {
    CostsList,
  },
  props: {
    pageCount: Number,
    pageData: Array,
    currentPage: Number,
  },
  data: () => ({
    paginationPage: 1,
  }),
  methods: {
    ...mapGetters(["getCostsPageData"]),
    toggleInputFormVisible() {
      this.showInputForm = !this.showInputForm;
    },
  },
  mounted: function () {

  },
  watch: {},
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
