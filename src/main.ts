import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Actor from "@/components/Entities/Actor.vue";

Vue.config.productionTip = false;

Vue.component("actor", Actor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
