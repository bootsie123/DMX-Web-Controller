import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import dmx from "./modules/dmx";
import status from "./modules/status";
import actions from "./modules/actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    auth,
    dmx,
    status,
    actions
  }
});
