import "regenerator-runtime/runtime";
import { createLocalVue, mount } from "@vue/test-utils";
import CostsList from "../src/components/CostsList";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("CostsList", () => {
  let actions;
  let getters;
  let mutations;
  let store;

  beforeEach(() => {
    actions = {
      postData: jest.fn(),
    };
    getters = {
      getCostsCategories() {
        return catSelectOptions;
      },
    };
    mutations = {
      addCostsCategories: jest.fn(),
    };
    store = new Vuex.Store({ actions, getters, mutations });
  });

  test("CostInputForm table header", async () => {
    const wrapper = mount(CostsList, {
      store,
      localVue,
      mocks: {},
      propsData: {
        costsList: [],
      },
    });
    const headerCellsText = ["#", "Date", "Category", "Value"];

    const headerCells = wrapper.find("thead").findAll("th");
    expect(headerCells.length).toBe(4);
    for (let i = 0; i < headerCells.length; i++) {
      expect(headerCells.at(i).text()).toBe(headerCellsText[i]);
    }
  });

  test("CostInputForm table data", async () => {
    const items = [
      {
        id: 1,
        category: "Food",
        date: "11.12.2013",
        value: 365.99,
      },
      {
        id: 2,
        category: "Sport",
        date: "22.05.2017",
        value: 144,
      },
      {
        id: 3,
        category: "Education",
        date: "21.03.2018",
        value: 77.5,
      },
    ];
    const getItemField = (item, idx) => {
      return item[["id", "date", "category", "value"][idx]];
    };
    const wrapper = mount(CostsList, {
      store,
      localVue,
      mocks: {},
      propsData: {
        costsList: items,
      },
    });

    const rows = wrapper.find("tbody").findAll("tr");
    expect(rows.length).toBe(items.length);

    const cells = rows.at(0).findAll("td");
    expect(cells.length).toBe(5);
    for (let i = 0; i < 4; i++) {
      expect(cells.at(i).text()).toBe(String(getItemField(items[0], i)));
    }
  });

  test("CostInputForm context menu open", async () => {
    const items = [
      {
        id: 1,
        category: "Food",
        date: "11.12.2013",
        value: 365.99,
      },
    ];
    const $contextMenu = {
      show: jest.fn(),
      EventBus: {
        $on: jest.fn(),
      },
    };
    const wrapper = mount(CostsList, {
      store,
      localVue,
      mocks: { $contextMenu },
      propsData: {
        costsList: items,
      },
    });

    const rows = wrapper.find("tbody").findAll("tr");
    expect(rows.length).toBe(items.length);

    const ellipsisBtn = rows.at(0).findAll('span[name="ellipsisBtn"]');
    expect(ellipsisBtn.length).toBe(1);

    ellipsisBtn.at(0).trigger("click");
    expect($contextMenu.show).toHaveBeenCalled();
    expect($contextMenu.EventBus.$on).toHaveBeenCalled();
  });

  test("CostInputForm context menu delete", async () => {
    const items = [
      {
        id: 1,
        category: "Food",
        date: "11.12.2013",
        value: 365.99,
      },
    ];
    const $contextMenu = {
      show: jest.fn(),
      EventBus: {
        $on: jest.fn(),
        $off: jest.fn(),
      },
    };
    const wrapper = mount(CostsList, {
      store,
      localVue,
      mocks: { $contextMenu },
      propsData: {
        costsList: items,
      },
    });

    const rows = wrapper.find("tbody").findAll("tr");
    expect(rows.length).toBe(items.length);

    const ellipsisBtn = rows.at(0).findAll('span[name="ellipsisBtn"]');
    expect(ellipsisBtn.length).toBe(1);

    ellipsisBtn.at(0).trigger("click");
    wrapper.vm.onContextMenuCommand("cmdDelete");
    expect(actions.postData).toHaveBeenCalled();
    expect($contextMenu.EventBus.$off).toHaveBeenCalled();
  });

  test("CostInputForm context menu edit", async () => {
    const items = [
      {
        id: 1,
        category: "Food",
        date: "11.12.2013",
        value: 365.99,
      },
    ];
    const $contextMenu = {
      show: jest.fn(),
      EventBus: {
        $on: jest.fn(),
        $off: jest.fn(),
      },
    };
    const $modal = {
      show: jest.fn(),
    };
    const wrapper = mount(CostsList, {
      store,
      localVue,
      mocks: { $contextMenu, $modal },
      propsData: {
        costsList: items,
      },
    });

    const rows = wrapper.find("tbody").findAll("tr");
    expect(rows.length).toBe(items.length);

    const ellipsisBtn = rows.at(0).findAll('span[name="ellipsisBtn"]');
    expect(ellipsisBtn.length).toBe(1);

    ellipsisBtn.at(0).trigger("click");
    wrapper.vm.onContextMenuCommand("cmdEdit");
    expect($modal.show).toHaveBeenCalled();
    expect($contextMenu.EventBus.$off).toHaveBeenCalled();
  });
});
