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
        <paginated-costs-list
          :pageCount="serverPaymentsPageCount"
          :currentPage="currentPage"
          @changePage="onListPageChange"
          :pageData="pageData"
        />
      </v-col>
      <v-col>
        <v-card flat>
          <v-card-title class="justify-center">
            Costs by categories
          </v-card-title>
          <CostsChart
            :chartData="chartData"
            :options="{
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
              },
              legend: {
                position: 'right',
              },
            }"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CostInputForm from "../components/CostInputForm.vue";
import PaginatedCostsList from "../components/PaginatedCostsList.vue";
import CostsChart from "../components/CostsChart.vue";
import { mapGetters } from "vuex";
import { FETCH_PAYMENTS_DATA } from "../action-types";
import {
  GET_PAYMENTS_PER_PAGE,
  GET_PAYMENTS_PAGE_COUNT,
  GET_PAYMENTS_PAGE_DATA
} from "../getter-types";

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomColorVector = (size) => {
  const vec = [];
  while (vec.length < size) {
    vec.push(getRandomColor());
  }
  return vec;
};

export default {
  components: {
    CostInputForm,
    PaginatedCostsList,
    CostsChart,
  },
  data: () => ({
    showInputForm: false,
    maxCostsListPageLength: 5,
    currentPage: 1,
  }),
  methods: {
    ...mapGetters["getCostsByCategories"],
    toggleInputFormVisible() {
      this.showInputForm = !this.showInputForm;
    },
    updateCurrentPageIndex() {
      if (this.$route.name === "Dashboard") {
        const urlPage = Number(this.$route.params.page);
        if (Number.isInteger(urlPage) && urlPage > 0) {
          this.currentPage = urlPage;
        }
      }
    },
    onListPageChange(newPage) {
      this.$router.push(`/dashboard/${newPage}`);
      this.$store.dispatch(FETCH_PAYMENTS_DATA, newPage);
    },
  },
  computed: {
    chartData() {
      const costsMap = this.$store.getters.getCostsByCategories;
      console.log("costsMap:", costsMap);
      const result = {
        labels: [...costsMap.keys()],
        datasets: [
          {
            label: "Costs by categories",
            backgroundColor: getRandomColorVector(costsMap.size),
            data: [...costsMap.values()],
          },
        ],
      };
      return result;
    },
    routerCurrentPage() {
      return this.$route.params.page;
    },
    serverPaymentsPerPage() {
      return this.$store.getters[GET_PAYMENTS_PER_PAGE];
    },
    serverPaymentsPageCount() {
      return this.$store.getters[GET_PAYMENTS_PAGE_COUNT];
    },
    pageData() {
      return this.$store.getters[GET_PAYMENTS_PAGE_DATA](this.currentPage).data;
    },
  },
  mounted() {
    this.$store.dispatch("FETCH_PAYMENTS_HASHES").then(() => {
      this.updateCurrentPageIndex();
      this.$store.dispatch(FETCH_PAYMENTS_DATA, this.currentPage);
    });

    if (
      this.$route.name === "addPaymentPreset" ||
      this.$route.name === "addPaymentManual"
    ) {
      this.showInputForm = true;
    }
  },
  watch: {
    routerCurrentPage() {
      this.updateCurrentPageIndex();
    },
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
