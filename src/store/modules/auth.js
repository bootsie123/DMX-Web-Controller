import axios from "../axios";

const state = {
  user: {},
  tokens: {
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || ""
  },
  status: "",
  error: null
};

const getters = {
  isLoggedIn: state => !!state.tokens.accessToken,
  status: state => state.status,
  error: state => state.error
};

const actions = {
  async login({ commit }, user) {
    try {
      commit("auth_request");

      const res = await axios.post("auth", user);

      if (res.data.status === 200) {
        commit("login_success", res.data);
      }

      return res;
    } catch (err) {
      commit("error", err);

      return Promise.reject(err);
    }
  },
  async signup({ commit }, user) {
    try {
      commit("auth_request");

      const res = await axios.post("users", user);

      if (res.data.status === 200) {
        commit("login_success", res.data);
      }

      return res;
    } catch (err) {
      commit("error", err);

      return Promise.reject(err);
    }
  }
};

const mutations = {
  auth_request(state) {
    state.error = null;
    state.status = "loading";
  },
  login_success(state, { accessToken, refreshToken }) {
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    delete axios.defaults.headers.common["x-auth-token"];

    state.user = {};

    state.tokens.accessToken = "";
    state.tokens.refreshToken = "";

    state.error = null;
    state.status = "";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
