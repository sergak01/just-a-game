<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
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

@Component({
  components: { Bullets }
})
export default class App extends Vue {
  created() {
    setInterval(this.tickGame, 1000 / 60);
    setInterval(this.renderScene, 1000 / 60);
  }

  tickGame() {
    this.$root.$emit("tick-game");
  }

  renderScene() {
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
