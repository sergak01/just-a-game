<template>
  <div
    class="actor"
    :style="{
      left: left + 'px',
      top: top + 'px',
      transform: `rotate(${rotate}deg)`
    }"
  >
    <div class="gun" ref="gun"></div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import GameMixin, { TICK_GAME, RENDER_SCENE } from "@/mixins/game";
import { PUSH_BULLET } from "@/store/modules/bullets";

@Component({
  data() {
    return {
      name: "Actor"
    };
  }
})
export default class Actor extends Mixins(GameMixin) {
  private _left: number = 10;
  private _top: number = 10;

  private _fpsMax = 60;

  // private _gameSpeed = 60;

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

    this.$data.interval = setInterval(this[RENDER_SCENE], 1000 / this.fpsMax);
  }

  controlLeft: boolean = false;
  controlRight: boolean = false;
  controlUp: boolean = false;
  controlDown: boolean = false;

  created(): void {
    console.log("ready");

    window.addEventListener("keydown", this.controlsDown);
    window.addEventListener("keyup", this.controlsUp);
    window.addEventListener("mousemove", this.mouseMove);
    window.addEventListener("click", this.fire);

    // this.interval = setInterval(this.renderScene, 1000 / this.fpsMax);
    // setInterval(this.tickGame, 1000 / this._gameSpeed);
  }

  // mounted() {
  //   this.$root.$on("render-scene", this.renderScene);
  //   this.$root.$on("tick-game", this.tickGame);
  // }

  [RENDER_SCENE](): void {
    this.left = Actor._leftState;
    Actor._leftState = 0;
    // (this.controlLeft ? -this.step : 0) + (this.controlRight ? this.step : 0);
    this.top = Actor._topState;
    Actor._topState = 0;
    // (this.controlUp ? -this.step : 0) + (this.controlDown ? this.step : 0);

    this.rotate =
      Math.atan2(
        10 * (this.mouseLastPosY - this.top - 10),
        10 * (this.mouseLastPosX - this.left - 10)
      ) *
      (180 / Math.PI);
  }

  [TICK_GAME](): void {
    Actor._leftState +=
      (this.controlLeft ? -this.STEP : 0) + (this.controlRight ? this.STEP : 0);
    Actor._topState +=
      (this.controlUp ? -this.STEP : 0) + (this.controlDown ? this.STEP : 0);
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

  public fire(/*e: MouseEvent*/) {
    let clientRect = (this.$refs.gun as Element).getClientRects()[0];

    this.$store.commit(PUSH_BULLET, {
      top: clientRect.top,
      left: clientRect.left,
      vector:
        Math.atan2(
          10 * (this.mouseLastPosY - clientRect.top - 10),
          10 * (this.mouseLastPosX - clientRect.left - 10)
        ) *
        (180 / Math.PI)
    });
  }

  rotate: number = 0;
  mouseLastPosX: number = 0;
  mouseLastPosY: number = 0;

  public mouseMove(e: MouseEvent) {
    // console.log(e);
    this.mouseLastPosX = e.clientX;
    this.mouseLastPosY = e.clientY;

    // let dAx = 10;
    // let dAy = 0;
    // let dBx = this.mouseLastPosX - this.left - 10;
    // let dBy = this.mouseLastPosY - this.top - 10;
    //
    // let angle =
    //   Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy) *
    //   (180 / Math.PI);
    //
    // this.rotate =
    //   Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy) *
    //   (180 / Math.PI);
  }
}
</script>

<style scoped lang="scss">
.actor {
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  transform-origin: 50% 50%;
  background: cadetblue;
  border-right: 1px solid black;
  border-radius: 50%;

  .gun {
    display: block;
    position: absolute;
    left: 100%;
    top: 50%;
    width: 0;
    height: 0;
  }
}
</style>
