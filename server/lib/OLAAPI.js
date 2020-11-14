const request = require("request-promise-native");

const API_ENDPOINT = "https://c87d7c99-9e0c-401f-8b9e-b827eb246c20.my-devices.net/";

const defaultHeaders = {
  "Content-Type": "application/json",
  "X-PTTH-Authorization": "Basic dGNzc3dpbUBnbWFpbC5jb206bXJQYXNzd29yZA=="
};

function fetch(url, form, method = "GET", headers = defaultHeaders) {
  var options = {
    url: API_ENDPOINT + url,
    method,
    headers,
    json: true
  };

  if (form) {
    options.form = form;
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
