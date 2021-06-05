import "regenerator-runtime/runtime";
import { createLocalVue, mount } from "@vue/test-utils";
import CostInputForm from "../src/components/CostInputForm";
import Vuex from "vuex";
import VueRouter from "vue-router";
// import jestConfig from "../jest.config";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("CostInputForm", () => {
  let actions;
  let getters;
  let store;
  let router;
  const catSelectPlaceholder = "Please select payment description";
  const catSelectManualOption = "enter new payment description below";
  const catSelectOptions = ["Food", "Sport", "Education"];

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
    store = new Vuex.Store({ actions, getters });
    router = new VueRouter();
  });

  test("CostInputForm fetch categories", () => {
    const wrapper = mount(CostInputForm, {
      store,
      localVue,
      router,
      propsData: {
        settings: {
          formData: {
          },
          formButtons: ["add"],
        },
      },
    });
    expect(actions.fetchCategories).toHaveBeenCalled();

  });

  test("Content of CostInputForm", () => {
    const wrapper = mount(CostInputForm, {
      store,
      localVue,
      router,
      propsData: {
        settings: {
          formData: {
            id: 1,
            date: "11.11.2011",
            category: "Food",
            value: 365.99,
          },
          formButtons: ["add"],
        },
      },
    });
    const optionEls = wrapper.find("select").findAll("option");
    // Две опции селекта категорий захардкожены и три передает тест
    expect(optionEls.length).toEqual(5);
    // Проверка всех опций селекта категорий
    [catSelectPlaceholder, ...catSelectOptions, catSelectManualOption].forEach(
      (val, index) => {
        expect(optionEls.at(index).text()).toEqual(val);
      }
    );
    // Проверка выбранной опции селекта категорий
    expect(wrapper.find("option:checked").text()).toEqual(catSelectPlaceholder);
  });
});
