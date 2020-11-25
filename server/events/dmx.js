const OLAAPI = require("../lib/OLAAPI");
const sACN = require("../lib/sACN");

module.exports = socket => {
  socket
  .on("get_dmx", async (universe = 1) => {
    try {
      const dmx = await OLAAPI.getDMX(universe);

      socket.emit("get_dmx", dmx);
    } catch (err) {
      console.error(err);
    }
  })
  .on("set_dmx", data => {
    const { universe, dmx } = data;

    sACN.setDMX(universe, dmx);
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
