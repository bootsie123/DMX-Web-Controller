import axios from "../axios";

const state = {
  actions: [],
  runningAction: {},
  error: null
};

const getters = {
  actions: state => state.actions,
  runningAction: state => state.runningAction,
  error: state => state.error
};

const actions = {
  async get_actions({ commit }) {
    try {
      const res = await axios.get("actions");

      if (res.data.status === 200) {
        commit("set_actions", res.data.actions);

        const runningAction = res.data.actions.find(action => action.running);

        if (runningAction) {
          commit("set_running_action", runningAction);
        }
      }
    } catch (err) {
      commit("error", err);

      return Promise.reject(err);
    }
  },
  async run_action({ commit }, actionId) {
    try {
      const res = await axios.post(`actions/${actionId}/run`);

      return res;
    } catch (err) {
      commit("error", err);

      return Promise.reject(err);
    }
  },
  async stop_action({ commit }, actionId) {
    try {
      const res = await axios.post(`actions/${actionId}/stop`);

      return res;
    } catch (err) {
      commit("error", err);

      return Promise.reject(err);
    }
  },
  SOCKET_action_started({ state, commit }, actionId) {
    commit("set_running_action", state.actions[actionId]);
  },
  SOCKET_action_ended({ commit }) {
    commit("set_running_action", {});
  }
};

const mutations = {
  set_actions(state, actions) {
    state.actions = actions;
  },
  set_running_action(state, action) {
    state.runningAction = action;
  },
  error(state, err) {
    state.error = err.error;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
