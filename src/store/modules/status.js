//import axios from "../axios";

const state = {
  status: "online",
  lastUpdate: Date.now(),
  error: null
};

const getters = {
  status: state => state.status,
  lastUpdate: state => state.lastUpdate,
  error: state => state.error
};

const actions = {

};

const mutations = {
  SOCKET_status(state, status) {
    state.error = null;
    state.status = status;
    state.lastUpdate = Date.now();
  },
  error(state, err) {
    state.error = err.error;
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
