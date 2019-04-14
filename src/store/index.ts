import Vue from "vue";
import Vuex from "vuex";
import bullets from "@/store/modules/bullets";
import settings from "@/store/modules/settings";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    bullets,
    settings
  }
});
