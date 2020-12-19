import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import store from "./store";

import App from "./App.vue";
import router from "./router";

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

const API_URL = process.env.VUE_APP_API_URL;
const location = window.location;

Vue.config.productionTip = false;

require("./assets/main.scss");

Vue.use(
  new VueSocketIO({
    connection: API_URL || location.protocol + "//" + location.hostname + ":" + location.port,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

Vue.component("VueSlider", VueSlider);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
