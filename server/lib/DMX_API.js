const dmxConfig = require("../config").dmx;

const sACN = require("./sACN");

const dmxUtils = require("../utils/dmx");

class DMX_API {
  send(dmx, universe = 0, mode = dmxConfig.defaultDMXMode) {
    sACN.setDMX(universe, dmxUtils.mapToMode(mode, dmx));
  }

  fill(dmx, value, start = 0, end = dmx.length) {
    for (let i = start; i < end; i++) {
      dmx[i] = value;
    }
  }
}

module.exports = API = new DMX_API(); //eslint-disable-line no-undef
