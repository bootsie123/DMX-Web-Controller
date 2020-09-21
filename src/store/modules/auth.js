import jwt_decode from "jwt-decode";

import axios from "../axios";

const state = {
  user: {},
  tokens: {
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || ""
  },
  status: "",
  error: null,
  refreshTask: null
};

const getters = {
  isLoggedIn: state => !!state.tokens.accessToken,
  status: state => state.status,
  error: state => state.error
};

const actions = {
  async login({ dispatch, commit }, user) {
    try {
      commit("auth_request");

      const res = await axios.post("auth", user);

      if (res.data.status === 200) {
        dispatch("login_success", res.data);
      }

      return res;
    } catch (err) {
      commit("error", err);

      return Promise.reject(err);
    }
  },
  async signup({ dispatch, commit }, user) {
    try {
      commit("auth_request");

      const res = await axios.post("users", user);

      if (res.data.status === 200) {
        dispatch("login_success", res.data);
      }

      return res;
    } catch (err) {
      commit("error", err);

      return Promise.reject(err);
    }
  },
  async refreshAuth({ dispatch, commit }) {
    try {
      const data = {
        refreshToken: this.state.auth.tokens.refreshToken
      };

      const res = await axios.post("auth/token", data);

      if (res.status === 200) {
        commit("auth_success", res.data);
        dispatch("create_refreshTask", res.data.accessToken);
      }

      return res;
    } catch (err) {
      console.error(err);

      return Promise.reject(err);
    }
  },
  login_success({ dispatch, commit }, data) {
    dispatch("create_refreshTask", data.accessToken);
    commit("auth_success", data);
  },
  create_refreshTask({ dispatch, commit }, accessToken) {
    const decodedToken = jwt_decode(accessToken);
    const timeUntilRefresh = (decodedToken.exp - Date.now() / 1000 - 5 * 60) * 1000;

    console.log(timeUntilRefresh, decodedToken, decodedToken.exp, Date.now());

    const refreshTask = setTimeout(() => {
      console.log("Task Refresh");

      dispatch("refreshAuth");
    }, timeUntilRefresh);

    commit("set_refreshTask", refreshTask);
  }
};

const mutations = {
  auth_request(state) {
    state.error = null;
    state.status = "loading";
  },
  auth_success(state, { accessToken, refreshToken }) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    axios.defaults.headers.common["x-auth-token"] = accessToken;

    state.tokens.accessToken = accessToken;
    state.tokens.refreshToken = refreshToken;

    state.error = null;
    state.status = "success";
  },
  error(state, err) {
    state.error = err.error;
    state.status = "error";
  },
  logout(state) {
    if (state.refreshTask) {
      clearTimeout(state.refreshTask);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    delete axios.defaults.headers.common["x-auth-token"];

    state.user = {};

    state.tokens.accessToken = "";
    state.tokens.refreshToken = "";

    state.error = null;
    state.refreshTask = null;
    state.status = "";
  },
  set_refreshTask(state, refreshTask) {
    if (state.refreshTask) {
      clearTimeout(state.refreshTask);
    }

    state.refreshTask = refreshTask;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
