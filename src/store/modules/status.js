//import axios from "../axios";

const state = {
  status: "offline",
  lastUpdate: Date.now(),
  error: null
};

const getters = {
  status: state => state.status,
  lastUpdate: state => state.lastUpdate,
  error: state => state.error
};

const actions = {
  set_error({ commit }, err) {
    commit("error", err);
  }
};

const mutations = {
  SOCKET_status(state, status) {
    state.error = null;
    state.status = status;
    state.lastUpdate = Date.now();
  },
  error(state, err) {
    state.error = err.error || err;
    state.status = "error";
    state.lastUpdate = Date.now();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
