<template>
  <div class="actor" :style="{ left: left + 'px', top: top + 'px' }"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  data() {
    return {
      name: "Actor"
    };
  }
})
export default class Actor extends Vue {
  private _left: number = 10;
  private _top: number = 10;

  private step: number = 1;

  private _fpsMax = 60;

  private _gameSpeed = 60;

  private interval = 0;

  private static _leftState = 0;
  private static _topState = 0;

  get left(): number {
    return this.$data._left !== undefined ? this.$data._left : 0;
  }

  set left(val: number) {
    if (!val) {
      return;
    }

    if (this.$data._left + val < 0) {
      this.$data._left = 0;
    } else if (
      this.$data._left + val >
      window.innerWidth - this.$el.clientWidth
    ) {
      this.$data._left = window.innerWidth - this.$el.clientWidth;
    } else {
      this.$data._left += val;
    }
  }

  get top(): number {
    return this.$data._top !== undefined ? this.$data._top : 0;
  }

  set top(val) {
    if (!val) {
      return;
    }

    if (this.$data._top + val < 0) {
      this.$data._top = 0;
    } else if (
      this.$data._top + val >
      window.innerHeight - this.$el.clientHeight
    ) {
      this.$data._top = window.innerHeight - this.$el.clientHeight;
    } else {
      this.$data._top += val;
    }
  }

  get fpsMax(): number {
    return this.$data._fpsMax;
  }

  set fpsMax(val) {
    this.$data._fpsMax = val;

    clearInterval(this.$data.interval);

    this.$data.interval = setInterval(this.renderScene, 1000 / this.fpsMax);
  }

  controlLeft: boolean = false;
  controlRight: boolean = false;
  controlUp: boolean = false;
  controlDown: boolean = false;

  created(): void {
    console.log("ready");

    window.addEventListener("keydown", this.controlsDown);
    window.addEventListener("keyup", this.controlsUp);

    this.interval = setInterval(this.renderScene, 1000 / this.fpsMax);
    setInterval(this.tickGame, 1000 / this._gameSpeed);
  }

  renderScene(): void {
    this.left = Actor._leftState;
    Actor._leftState = 0;
    // (this.controlLeft ? -this.step : 0) + (this.controlRight ? this.step : 0);
    this.top = Actor._topState;
    Actor._topState = 0;
    // (this.controlUp ? -this.step : 0) + (this.controlDown ? this.step : 0);
  }

  tickGame(): void {
    Actor._leftState +=
      (this.controlLeft ? -this.step : 0) + (this.controlRight ? this.step : 0);
    Actor._topState +=
      (this.controlUp ? -this.step : 0) + (this.controlDown ? this.step : 0);
  }

  public controlsDown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowRight":
        this.controlRight = true;
        break;
      case "ArrowLeft":
        this.controlLeft = true;
        break;
      case "ArrowUp":
        this.controlUp = true;
        break;
      case "ArrowDown":
        this.controlDown = true;
        break;
      default:
        break;
    }
  }

  public controlsUp(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowRight":
        this.controlRight = false;
        break;
      case "ArrowLeft":
        this.controlLeft = false;
        break;
      case "ArrowUp":
        this.controlUp = false;
        break;
      case "ArrowDown":
        this.controlDown = false;
        break;
      default:
        break;
    }
  }
}
</script>

<style scoped lang="scss">
.actor {
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  background: wheat;
}
</style>
