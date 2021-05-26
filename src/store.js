import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    costs: [],
    costsPageCount: 1,
    costsCategories: new Set(),
    costsCurrentPageNum: 1,
  },
  mutations: {
    setCostsPageData(state, newData) {
      // console.log("setCostsPageData", newData);
      Vue.set(state.costs, newData.pageNum, newData.pageData);
      state.costsPageCount = newData.pageCount;
    },
    addCostsCategories(state, newCategories) {
      state.costsCategories = new Set([
        ...state.costsCategories,
        ...newCategories,
      ]);
    },
    setCostsPageNum(state, pageNum) {
      state.costsCurrentPageNum = pageNum;
    },
  },
  getters: {
    getCostsPageData: (state) => (pageNum) => {
      const pageData = state.costs[pageNum];
      // console.log(
      //   "getCostsPageData",
      //   getPageKey(pageNum),
      //   state.costs[getPageKey(pageNum)]
      // );
      return pageData === undefined ? [] : pageData;
    },
    getCostsListPageCount: (state) => state.costsPageCount,
    getCostsCategories: (state) => state.costsCategories,
    getCostsCurrentPageNum: (state) => state.costsCurrentPageNum,
  },
  actions: {
    postData({ commit }, newData) {
      return fetch("/PaymentsData", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
        body: JSON.stringify(newData), // body data type must match "Content-Type" header
      })
        .then((response) => {
          return response.json();
        })
        .then((val) => {
          commit("setCostsPageData", val);
          commit("setCostsPageNum", val.pageNum);
        });
    },
    fetchData({ commit }, pageNum) {
      return fetch(`/PaymentsData?page=${pageNum}`)
        .then((resp) => {
          return resp.json();
        })
        .then((val) => {
          commit("setCostsPageData", val);
        });
    },
    fetchCategories({ commit }) {
      return fetch("/Categories")
        .then((resp) => {
          return resp.json();
        })
        .then((val) => {
          commit("addCostsCategories", val);
        });
    },
  },
});

export default store;
