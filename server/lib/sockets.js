const socket = require("socket.io");
const socketioJwt = require("socketio-jwt");
const fs = require("fs");

const jwtConfig = require("../config").passport.strategies.jwt;

module.exports = server => {
  const io = socket(server);

  io.sockets.on("connection", socketioJwt.authorize({
    secret: jwtConfig.accessSecretOrKey,
    timeout: 15000
  }))
  .on("authenticated", socket => {
    const events = fs.readdirSync(__dirname + "/../events");

    for (let event of events) {
      require("../events/" + event)(socket);
    }
  });

  setTimeout(() => {
    io.sockets.emit("status", { status: "online" });
  }, 30000);
}
