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

  beforeEach(() => {
    actions = {
      fetchCategories: jest.fn(),
      postData: jest.fn(),
    };
    getters = {
      getCostsCategories: jest.fn(),
    };
    store = new Vuex.Store({ actions, getters });
    router = new VueRouter();
  });
  test("Content of CostInputForm", () => {
    const wrapper = mount(CostInputForm, {
      store,
      localVue,
      router,
      propsData: {
        settings: {
          formData: {},
          formButtons: ["add"],
        },
      },
    });
    expect(wrapper.text()).toEqual("The message is: Hello from test!");
  });
});
