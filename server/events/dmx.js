const OLAAPI = require("../lib/OLAAPI");

module.exports = socket => {
  socket.on("get_dmx", () => {
    console.log("get_dmx");
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
