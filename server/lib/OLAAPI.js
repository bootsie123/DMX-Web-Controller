const request = require("request-promise-native");

let API_ENDPOINT = require("../config").dmx.olaAPI;

if (API_ENDPOINT[API_ENDPOINT.length - 1] !== "/") {
  API_ENDPOINT = API_ENDPOINT + "/";
}

const defaultHeaders = {
  "Content-Type": "application/json"
};

function fetch(url, qs, method = "GET", headers = defaultHeaders) {
  var options = {
    url: API_ENDPOINT + url,
    method,
    headers,
    json: true
  };

  if (qs) {
    options.qs = qs;
  }

  return request(options);
}

exports.serverStats = () => {
  return new Promise((resolve, reject) => {
    fetch("json/server_stats")
      .then(resolve)
      .catch(reject);
  });
}

exports.reloadPlugins = () => {
  return new Promise((resolve, reject) => {
    fetch("reload")
      .then(resolve)
      .catch(reject);
  });
}

exports.getDMX = universe => {
  return new Promise((resolve, reject) => {
    fetch("get_dmx", { u: universe })
      .then(resolve)
      .catch(reject);
  });
}

exports.setDMX = (universe, dmx) => {
  return new Promise((resolve, reject) => {
    fetch("set_dmx", { u: universe, d: dmx }, "POST")
      .then(resolve)
      .catch(reject);
  });
}

try {
  this.reloadPlugins();

  console.info("OLA plugins reloaded");
} catch (err) {
  console.error("Unable to reload plugins", err);
}
