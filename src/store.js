import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getPageKey = (pageNum) => `page${pageNum}`;

const store = new Vuex.Store({
  state: {
    costs: {},
    costsPageCount: 1,
    costsPerPage: 1,
    userAddedCostCount: 0,
    costsCategories: new Set(),
  },
  mutations: {
    addNewCost(state, { category, value, date }) {
      const pageKey = getPageKey(state.costsPageCount);
      const pageData = state.costs[pageKey];
      const newRecId = pageData[pageData.length - 1].id + 1;
      const newRec = {
        id: newRecId,
        date: String(date),
        category: String(category),
        value: Number(value),
      };

      if (pageData.length >= state.costsPerPage) {
        const newPageKey = getPageKey(state.costsPageCount + 1);
        Vue.set(state.costs, newPageKey, [newRec]);
        state.costsPageCount += 1;
      } else {
        Vue.set(state.costs[pageKey], pageData.length, newRec);
      }

      state.userAddedCostCount += 1;
    },
    setCostsPageData(state, { pageNum, newData }) {
      const pageKey = getPageKey(pageNum);
      // console.log("setCostsPageData", newData);
      Vue.set(state.costs, pageKey, newData);
    },
    addCostsCategories(state, newCategories) {
      state.costsCategories = new Set([
        ...state.costsCategories,
        ...newCategories,
      ]);
    },
  },
  getters: {
    getCostsPageData: (state) => (pageNum) => {
      const pageData = state.costs[getPageKey(pageNum)];
      // console.log(
      //   "getCostsPageData",
      //   getPageKey(pageNum),
      //   state.costs[getPageKey(pageNum)]
      // );
      return pageData === undefined ? [] : pageData;
    },
    getCostsListPageCount: (state) => state.costsPageCount,
    getCostsPerPageLimit: (state) => state.costsPerPage,
    getUserAddedCostCount: (state) => state.userAddedCostCount,
    getCostsCategories: (state) => state.costsCategories,
  },
  actions: {
    fetchDataStatus({ commit, state }) {
      return fetch("/PaymentsDataStatus.json").then((response) => {
        response.json().then((val) => {
          // console.log(val);
          state.costsPageCount = Math.max(val.pageCount, state.costsPageCount);
          state.costsPerPage = val.costsPerPage;
          commit("addCostsCategories", val.categories);
        });
      });
    },
    fetchData({ commit, state }, pageNum) {
      return fetch("/PaymentsData.json").then((resp) => {
        resp.json().then((val) => {
          const pageKey = getPageKey(pageNum);
          if (state.costs[pageKey] === undefined) {
            commit("setCostsPageData", { pageNum, newData: val[pageKey] });
          }
          // console.log(val, val[pageKey]);
        });
      });
    },
  },
});

export default store;
