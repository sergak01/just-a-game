import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Actor from "@/components/Entities/Actor.vue";
import { ObserveVisibility } from "vue-observe-visibility";

Vue.config.productionTip = false;

Vue.directive("observe-visibility", ObserveVisibility);

Vue.component("actor", Actor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
