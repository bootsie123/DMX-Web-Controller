import axios from "../axios";

const state = {
  status: "offline",
  lastUpdate: "",
  error: null
};

const getters = {
  status: state => state.status,
  lastUpdate: state => state.lastUpdate,
  error: state => state.error
};

const actions = {
  async check_status({ commit }) {
    try {
      const res = await axios.get("test");

      if (res.data.status === 200) {
        commit("update_status", "online");
      }

      return res;
    } catch (err) {
      commit("error", err);
    }
  }
};

const mutations = {
  update_status(state, status) {
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
