<template>
  <div class="bullets">
    <template v-for="(bullet, index) in bullets">
      <bullet
        v-if="bullet"
        :key="`${index}`"
        :top="bullet.top"
        :left="bullet.left"
        :vector="bullet.vector"
        :index="bullet.key"
      ></bullet>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Bullet from "@/components/Entities/Bullet.vue";

@Component({
  components: {
    Bullet
  },
  data() {
    return {
      name: "Bullets"
    };
  }
})
export default class Bullets extends Vue {
  get bullets() {
    return this.$store.state.bullets.bullets;
  }
}
</script>

<style scoped lang="scss"></style>
