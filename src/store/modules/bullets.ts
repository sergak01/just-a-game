import Vue from "vue";

export const PUSH_BULLET = "PUSH_BULLET";
export const REMOVE_BULLET = "REMOVE_BULLET";

export default {
  state: {
    bullets: {},
    count: 0
  },
  mutations: {
    [PUSH_BULLET](state: any, item: any): void {
      let key: string = `bullet-${state.count}`;
      item.key = key;

      Vue.set(state.bullets, key, item);

      state.count += 1;
    },
    [REMOVE_BULLET](state: any, key: string): void {
      Vue.delete(state.bullets, key);
    }
  },
  actions: {}
};
