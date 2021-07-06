import Vue from "vue";
import Vuex from "vuex";
import { SET_PAYMENTS_DATA_HASHES } from "./mutation-types";
import {
  GET_PAYMENTS_PER_PAGE,
  GET_PAYMENTS_PAGE_COUNT,
  GET_PAYMENTS_PAGE_DATA,
} from "./getter-types";
import { FETCH_PAYMENTS_DATA, FETCH_PAYMENTS_HASHES } from "./action-types";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    costs: [],
    costsPageCount: 1,
    costsCategories: new Set(),
    dashboardPage: 1,
    paymentsPerPage: 5,
    paymentsDataHashes: {
      pageCapacity: null,
      pageHashes: [],
    },
  },
  mutations: {
    setCostsPageData(state, newData) {
      // console.log("setCostsPageData", newData);
      Vue.set(state.costs, newData.pageNum, { hash: newData.pageHash, data: newData.pageData});
      state.costsPageCount = newData.pageCount;
    },
    addCostsCategories(state, newCategories) {
      state.costsCategories = new Set([
        ...state.costsCategories,
        ...newCategories,
      ]);
    },
    [SET_PAYMENTS_DATA_HASHES](state, value) {
      state.paymentsDataHashes.pageCapacity = Number(value.pageCapacity);
      if (Array.isArray(value.pageHashes)) {
        state.paymentsDataHashes.pageHashes = value.pageHashes;
      }
    },
  },
  getters: {
    [GET_PAYMENTS_PER_PAGE]: (state) => state.paymentsPerPage,
    [GET_PAYMENTS_PAGE_COUNT]: (state) =>
      state.paymentsDataHashes.pageHashes.length,
    [GET_PAYMENTS_PAGE_DATA]: (state) => (pageNum) => {
      const pageData = state.costs[pageNum];
      // console.log(
      //   "getCostsPageData",
      //   getPageKey(pageNum),
      //   state.costs[getPageKey(pageNum)]
      // );
      return pageData === undefined ? [] : pageData;
    },
    getCostsListPageCount: (state) => state.costsPageCount,
    getCostsCategories: (state) => [...state.costsCategories],
    getCostsByCategories: (state) => {
      const map = new Map();
      state.costs.forEach((page) => {
        page.data.forEach((cost) => {
          const value = map.get(cost.category);
          map.set(cost.category, cost.value + (value ? +value : 0));
        });
      });
      return map;
    },
  },
  actions: {
    postData({ commit, state  }, newData) {
      return fetch(`/PaymentsData?pageCapacity=${state.paymentsPerPage}`, {
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
          return val.pageNum;
        });
    },
    [FETCH_PAYMENTS_DATA]({ commit, state }, pageNum) {
      return fetch(`/PaymentsData?page=${pageNum}&pageCapacity=${state.paymentsPerPage}`)
        .then((resp) => {
          return resp.json();
        })
        .then((val) => {
          commit("setCostsPageData", val);
        });
    },
    [FETCH_PAYMENTS_HASHES]({ commit, state }) {
      return fetch(`/PaymentsDataHashes?pageCapacity=${state.paymentsPerPage}`)
        .then((resp) => {
          return resp.json();
        })
        .then((val) => {
          commit(SET_PAYMENTS_DATA_HASHES, val);
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
