const ACNSender = require("stagehack-sacn").Sender;

ACNSender.Start();

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
