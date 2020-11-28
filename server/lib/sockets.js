const socket = require("socket.io");
const socketioJwt = require("socketio-jwt");
const fs = require("fs");

const jwtConfig = require("../config").passport.strategies.jwt;

let io;

exports.init = server => {
  io = socket(server);

  io.sockets
    .on(
      "connection",
      socketioJwt.authorize({
        secret: jwtConfig.accessSecretOrKey,
        timeout: 15000
      })
    )
    .on("authenticated", socket => {
      socket.join("authenticated");

      const events = fs.readdirSync(__dirname + "/../events");

      for (let event of events) {
        require("../events/" + event)(socket);
      }
    });
};

exports.io = () => {
  return io;
};
