import Vue from "vue";
import store from "./store";

import App from "./App.vue";
import router from "./router";

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

Vue.config.productionTip = false;

require("./assets/main.scss");

Vue.component("VueSlider", VueSlider);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
