import Vue from "vue";
import Component from "vue-class-component";

export const TICK_GAME = "TICK_GAME";
export const RENDER_SCENE = "RENDER_SCENE";

@Component
export default class GameMixin extends Vue {
  mounted() {
    this.$root.$on("render-scene", (this as any)[RENDER_SCENE]);
    this.$root.$on("tick-game", (this as any)[TICK_GAME]);
  }

  get STEP() {
    return this.$store.state.settings.step;
  }
}
