<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/settings">Settings</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <div>
      <actor></actor>
      <bullets></bullets>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Bullets from "@/components/Bullets.vue";
import { TICK_GAME, RENDER_SCENE } from "@/mixins/game";
import { ACTION_LOAD_SETTINGS } from "@/store/modules/settings";

@Component({
  components: { Bullets }
})
export default class App extends Vue {
  FPS_MAX: number = 60;
  STEP: number = 1;
  GAME_SPEED: number = 1;

  created() {
    this.$store
      .dispatch(ACTION_LOAD_SETTINGS)
      .then(() => {
        setInterval(this[TICK_GAME], 1000 / this.GAME_SPEED);
        setInterval(this[RENDER_SCENE], 1000 / this.FPS_MAX);
      })
      .catch(error => {
        console.error("Store settings not loaded", error);
      });
  }

  mounted() {
    this.FPS_MAX = this.$store.state.settings.maxFps;
    this.STEP = this.$store.state.settings.step;
    this.GAME_SPEED = this.$store.state.settings.gameSpeed;
  }

  [TICK_GAME]() {
    this.$root.$emit("tick-game");
  }

  [RENDER_SCENE]() {
    this.$root.$emit("render-scene");
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
