const OLAAPI = require("../lib/OLAAPI");
const sACN = require("../lib/sACN");

const dmxUtils = require("../utils/dmx");

const dmxConfig = require("../config").dmx;

module.exports = socket => {
  socket
  .on("get_dmx", async (universe = 1) => {
    try {
      const dmx = await OLAAPI.getDMX(universe);

      socket.emit("get_dmx", dmxUtils.mapToMode(4, dmx.dmx));
    } catch (err) {
      console.error(err);
    }
  })
  .on("set_dmx", data => {
    const { universe, dmx, mode = dmxConfig.defaultDMXMode } = data;

    sACN.setDMX(universe, dmxUtils.mapToMode(mode, dmx));
  })
  .on("status", async universe => {
    try {
      await OLAAPI.serverStats(universe || 1);

      socket.emit("status", "online");
    } catch (err) {
      socket.emit("status", "offline");
    }
  })
};
