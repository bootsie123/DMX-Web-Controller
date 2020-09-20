import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import settings from "./modules/settings";
import status from "./modules/status";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    auth,
    settings,
    status
  }
});
