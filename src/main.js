import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import store from "./store";

import App from "./App.vue";
import router from "./router";

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

Vue.config.productionTip = false;

require("./assets/main.scss");

Vue.use(new VueSocketIO({
  connection: process.env.VUE_APP_API_URL,
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
}));

Vue.component("VueSlider", VueSlider);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
