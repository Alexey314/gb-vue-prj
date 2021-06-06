import "regenerator-runtime/runtime";
import { createLocalVue, mount } from "@vue/test-utils";
import CostInputForm from "../src/components/CostInputForm";
import Vuex from "vuex";
import ModalWindowPlugin from "../src//plugins/ModalWindow/index.js";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(ModalWindowPlugin);

describe("CostInputForm", () => {
  let actions;
  let getters;
  let mutations;
  let store;
  const routePresetCategory = {
    name: "addPaymentPreset",
    params: {
      category: "Food",
    },
    query: {},
  };
  const routePresetCategoryValue = {
    name: "addPaymentPreset",
    params: {
      category: "Food",
    },
    query: {
      value: 100,
    },
  };
  const routeManual = {
    name: "",
    params: {},
    query: {},
  };
  const catSelectPlaceholder = "Please select payment description";
  const catSelectManualOption = "enter new payment description below";
  const catSelectOptions = ["Food", "Sport", "Education"];
  const validSettings = {
    formData: {
      id: 1,
      date: "11.11.2011",
      category: "User defined category",
      value: 365.99,
    },
    formButtons: ["add", "save", "close"],
  };
  const invalidSettings = {
    formButtons: ["add", "save", "close"],
  };

  beforeEach(() => {
    actions = {
      fetchCategories: jest.fn(),
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

  test("CostInputForm fetch categories", async () => {
    const wrapper = mount(CostInputForm, {
      store,
      localVue,
      mocks: {
        $route: routeManual,
      },
      propsData: {
        settings: validSettings,
      },
    });

    await localVue.nextTick();

    expect(actions.fetchCategories).toHaveBeenCalled();

    const optionEls = wrapper.find("select").findAll("option");

    // Две опции селекта категорий захардкожены и три передает тест
    expect(optionEls.length).toBe(5);
  });

  test("Content of CostInputForm", async () => {
    const wrapper = mount(CostInputForm, {
      store,
      localVue,
      mocks: {
        $route: routeManual,
      },
      propsData: {
        settings: validSettings,
      },
    });

    await localVue.nextTick();

    const optionEls = wrapper.find("select").findAll("option");

    // Проверка всех опций селекта категорий
    [catSelectPlaceholder, ...catSelectOptions, catSelectManualOption].forEach(
      (val, index) => {
        expect(optionEls.at(index).text()).toBe(val);
      }
    );

    optionEls.at(optionEls.length - 1).setSelected();

    await localVue.nextTick();

    // Проверка выбранной опции селекта категорий
    expect(wrapper.find("option:checked").text()).toBe(catSelectManualOption);

    // Проверка полей ввода
    const categoryInput = wrapper.find('input[name="categoryInput"]');
    expect(categoryInput.element.placeholder).toBe("Payment description");
    expect(categoryInput.element.value).toBe(validSettings.formData.category);

    const valueInput = wrapper.find('input[name="valueInput"]');
    expect(valueInput.element.placeholder).toBe("Payment amount");
    expect(valueInput.element.value).toBe(String(validSettings.formData.value));

    const dateInput = wrapper.find('input[name="dateInput"]');
    expect(dateInput.element.placeholder).toBe("Payment date");
    expect(dateInput.element.value).toBe(validSettings.formData.date);

    // Проверка кнопок
    const addBtn = wrapper.find('button[name="addBtn"]');
    expect(addBtn.text()).toBe("ADD+");

    const saveBtn = wrapper.find('button[name="saveBtn"]');
    expect(saveBtn.text()).toBe("SAVE");

    const closeBtn = wrapper.find('button[name="closeBtn"]');
    expect(closeBtn.text()).toBe("CLOSE");
  });

  test("CostInputForm validation negative", async () => {
    const wrapper = mount(CostInputForm, {
      store,
      localVue,
      mocks: {
        $route: routeManual,
      },
      propsData: {
        settings: invalidSettings,
      },
    });

    await localVue.nextTick();

    const addBtn = wrapper.find('button[name="addBtn"]');
    expect(addBtn.attributes("disabled")).toBe("disabled");
    addBtn.trigger("click");

    const saveBtn = wrapper.find('button[name="saveBtn"]');
    expect(saveBtn.attributes("disabled")).toBe("disabled");
    addBtn.trigger("click");

    await localVue.nextTick();

    expect(actions.postData).not.toHaveBeenCalled();
  });

  test("CostInputForm validation positive", async () => {
    const wrapper = mount(CostInputForm, {
      store,
      localVue,
      mocks: {
        $route: routeManual,
      },
      propsData: {
        settings: validSettings,
      },
    });

    await localVue.nextTick();

    const addBtn = wrapper.find('button[name="addBtn"]');
    expect(addBtn.attributes("disabled")).toBeUndefined();
    addBtn.trigger("click");

    const saveBtn = wrapper.find('button[name="saveBtn"]');
    expect(saveBtn.attributes("disabled")).toBeUndefined();
    saveBtn.trigger("click");

    await localVue.nextTick();

    expect(actions.postData).toHaveBeenCalledTimes(2);
  });

  test("CostInputForm add new category", async () => {
    const wrapper = mount(CostInputForm, {
      store,
      localVue,
      mocks: {
        $route: routeManual,
      },
      propsData: {
        settings: validSettings,
      },
    });

    await localVue.nextTick();

    const optionEls = wrapper.find("select").findAll("option");
    optionEls.at(optionEls.length - 1).setSelected();

    await localVue.nextTick();

    const addBtn = wrapper.find('button[name="addBtn"]');
    addBtn.trigger("click");

    const saveBtn = wrapper.find('button[name="saveBtn"]');
    saveBtn.trigger("click");

    await localVue.nextTick();

    expect(mutations.addCostsCategories).toHaveBeenCalledTimes(2);
  });

  test("CostInputForm close btn", async () => {
    const wrapper = mount(CostInputForm, {
      store,
      localVue,
      mocks: {
        $route: routeManual,
      },
      propsData: {
        settings: validSettings,
      },
    });

    const onHide = jest.fn();
    wrapper.vm.$modal.EventBus.$on("hide", onHide);

    const closeBtn = wrapper.find('button[name="closeBtn"]');
    closeBtn.trigger("click");

    await localVue.nextTick();

    expect(onHide).toHaveBeenCalled();
  });

  test("CostInputForm handle route with category preset", async () => {
    const wrapper = mount(CostInputForm, {
      store,
      localVue,
      mocks: {
        $route: routePresetCategory,
      },
      propsData: {
        settings: validSettings,
      },
    });

    await localVue.nextTick();

    expect(actions.postData).not.toHaveBeenCalled();
  });

  test("CostInputForm handle route with category/value preset", async () => {
    const wrapper = mount(CostInputForm, {
      store,
      localVue,
      mocks: {
        $route: routePresetCategoryValue,
      },
      propsData: {
        settings: validSettings,
      },
    });

    await localVue.nextTick();

    expect(actions.postData).toHaveBeenCalled();
  });
});
