import axios from "../axios";
import parse from "parse-color";

const state = {
  hue: 0,
  luminosity: 50,
  saturation: 100,
  alpha: 1,
  master: 0,
  updating: false
};

const getters = {
  master: state => state.master,
  hue: state => state.hue,
  luminosity: state => state.luminosity,
  saturation: state => state.saturation,
  alpha: state => state.alpha,
  red: state => toRGBFromHSLA(state).rgb[0],
  green: state => toRGBFromHSLA(state).rgb[1],
  blue: state => toRGBFromHSLA(state).rgb[2]
};

const actions = {
  RGB_to_HSLA({ dispatch }, obj) {
    const HSLA = toHSLAFromRGB(obj).hsla;

    dispatch("update_hue", HSLA[0]);
    dispatch("update_saturation", HSLA[1]);
    dispatch("update_luminosity", HSLA[2]);
    dispatch("update_alpha", HSLA[3]);
  },
  async update_dmx({ commit }) {
    try {
      if (!state.updating) {
        commit("update_start");

        await axios.post("dmx", { dmx: toRGBFromHSLA(state).rgb.join(",") + `,${state.master}` });

        commit("update_end");
      }
    } catch (err) {
      commit("update_end");
    }
  },
  update_hue({ commit, dispatch }, hue) {
    commit("update", { key: "hue", value: hue});
    dispatch("update_dmx");
  },
  update_saturation({ commit, dispatch }, saturation) {
    commit("update", { key: "saturation", value: saturation});
    dispatch("update_dmx");
  },
  update_luminosity({ commit, dispatch }, luminosity) {
    commit("update", { key: "luminosity", value: luminosity});
    dispatch("update_dmx");
  },
  update_alpha({ commit, dispatch }, alpha) {
    commit("update", { key: "alpha", value: alpha});
    dispatch("update_dmx");
  },
  update_master({ commit, dispatch }, master) {
    commit("update", { key: "master", value: master});
    dispatch("update_dmx");
  }
};

const mutations = {
  update(state, payload) {
    state[payload.key] = payload.value;
  },
  update_start(state) {
    state.updating = true;
  },
  update_end(state) {
    state.updating = false;
  }
};

const toRGBFromHSLA = obj => {
  return parse(`hsla(${obj.hue},${obj.saturation}, ${obj.luminosity}, ${obj.alpha})`);
}

const toHSLAFromRGB = obj => {
  return parse(`rgb(${obj.red},${obj.green},${obj.blue})`);
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
