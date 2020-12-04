const ACNSender = require("stagehack-sacn").Sender;

const interfaces = new ACNSender.Universe(1, 100).getPossibleInterfaces();

ACNSender.Start({ interfaces });

console.info("Sending DMX on interfaces:", interfaces);

const senders = {};

exports.setDMX = (universe, dmx) => {
  if (!senders[universe]) {
    const sender = new ACNSender.Universe(universe);

    senders[universe] = sender;

    sender.on("ready", () => {
      sender.send(dmx);
    });
  } else {
    senders[universe].send(dmx);
  }
};
