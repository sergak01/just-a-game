import Vue from "vue";
// import { Store } from "vuex";

export const MUTATION_LOAD_SETTINGS = "MUTATION_LOAD_SETTINGS";
export const MUTATION_SAVE_SETTINGS = "MUTATION_SAVE_SETTINGS";

export const ACTION_LOAD_SETTINGS = "ACTION_LOAD_SETTINGS";
export const ACTION_SAVE_SETTINGS = "ACTION_SAVE_SETTINGS";

const GAME_SETTINGS = "GAME_SETTINGS";

const defaultSettings = {
  maxFps: 60,
  step: 1,
  gameSpeed: 60
};

export default {
  state: {
    maxFps: 0,
    step: 1,
    gameSpeed: 0
  },
  mutations: {
    [MUTATION_LOAD_SETTINGS](state: object) {
      let settingsString = atob(localStorage.getItem(GAME_SETTINGS) || "");

      let settings: any = {};

      if (!settingsString) {
        settings = defaultSettings;
      } else {
        try {
          settings = JSON.parse(settingsString);
        } catch (e) {
          settings = defaultSettings;
        }
      }

      for (let key in settings) {
        if (settings.hasOwnProperty(key)) {
          Vue.set(state, key, settings[key]);
        }
      }
    },
    [MUTATION_SAVE_SETTINGS](state: object, value: any) {
      localStorage.setItem(GAME_SETTINGS, btoa(JSON.stringify(value)));

      for (let key in value) {
        if (value.hasOwnProperty(key)) {
          let _value = Number.parseFloat(value[key]);

          _value = !isNaN(_value) ? _value : value[key];

          Vue.set(state, key, _value);
        }
      }
    }
  },
  actions: {
    [ACTION_LOAD_SETTINGS]({ commit, state }: any) {
      commit(MUTATION_LOAD_SETTINGS);
      commit(MUTATION_SAVE_SETTINGS, state);
    },
    [ACTION_SAVE_SETTINGS]({ commit }: any, value: any) {
      commit(MUTATION_SAVE_SETTINGS, value);
    }
  }
};
