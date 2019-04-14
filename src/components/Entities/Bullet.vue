<template>
  <div
    class="bullet"
    :style="{
      top: `${bulletTop}px`,
      left: `${bulletLeft}px`
    }"
    v-observe-visibility="selfDestroy"
  ></div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import GameMixin, { TICK_GAME, RENDER_SCENE } from "@/mixins/game";
import { REMOVE_BULLET } from "@/store/modules/bullets";

@Component({
  data() {
    return {
      name: "Bullet"
    };
  }
})
export default class Bullet extends Mixins(GameMixin) {
  @Prop(Number) private left!: number;
  @Prop(Number) private top!: number;
  @Prop(Number) private readonly vector!: number;
  @Prop({ type: Number, default: 4 }) private speed!: number;
  @Prop([Number, String]) private readonly index!: number | string;

  _bulletLeft: number = 0;
  _bulletTop: number = 0;
  _doDestroy: boolean = false;

  created() {
    this.bulletTop = this.top;
    this.bulletLeft = this.left;
  }

  get bulletLeft() {
    return this.$data._bulletLeft;
  }

  set bulletLeft(value) {
    this.$data._bulletLeft = value;
  }

  get bulletTop() {
    return this.$data._bulletTop;
  }

  set bulletTop(value) {
    this.$data._bulletTop = value;
  }

  get rad() {
    return this.vector * (Math.PI / 180);
  }

  selfDestroy() {
    if (this.$data._doDestroy) {
      this.$store.commit(REMOVE_BULLET, this.index);
    } else {
      this.$data._doDestroy = true;
    }
  }

  [TICK_GAME](): void {
    this.bulletLeft += this.speed * Math.cos(this.rad);
    this.bulletTop += this.speed * Math.sin(this.rad);
  }

  [RENDER_SCENE](): void {}
}
</script>

<style scoped lang="scss">
.bullet {
  display: block;
  position: absolute;
  width: 2px;
  height: 2px;
  transform-origin: 50% 50%;
  background: black;
}
</style>
