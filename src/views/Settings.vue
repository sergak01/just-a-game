<template>
  <div>
    <b-row>
      <b-col class="text-center"><h1>Settings</h1></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form @submit.prevent="submit">
          <b-row>
            <b-col
              ><label for="maxFps">Set max game fps</label>
              <b-form-input
                type="number"
                v-model="settings.maxFps"
                name="maxFps"
                id="maxFps"
              ></b-form-input
            ></b-col>
          </b-row>
          <b-row>
            <b-col
              ><label for="maxFps">Set step</label>
              <b-form-input
                type="number"
                v-model="settings.step"
                name="step"
                id="step"
              ></b-form-input
            ></b-col>
          </b-row>
          <b-row>
            <b-col
              ><label for="maxFps">Set game speed</label>
              <b-form-input
                type="number"
                v-model="settings.gameSpeed"
                name="gameSpeed"
                id="gameSpeed"
              ></b-form-input
            ></b-col>
          </b-row>
          <b-row>
            <b-col><b-button type="submit">Submit</b-button></b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ACTION_SAVE_SETTINGS } from "@/store/modules/settings";

@Component({
  data() {
    return {
      name: "Settings"
    };
  }
})
export default class Settings extends Vue {
  // maxFps: number = 60;
  settings = {
    maxFps: 60,
    step: 1,
    gameSpeed: 60
  };
  submit() {
    this.$store
      .dispatch(ACTION_SAVE_SETTINGS, this.settings)
      .then(() => {
        console.log("Settings saved");
      })
      .catch(error => {
        console.error("Settings not saved", error);
      });
  }

  created() {
    this.settings = this.$store.state.settings;
  }
}
</script>

<style scoped lang="scss"></style>
