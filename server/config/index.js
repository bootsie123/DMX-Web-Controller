if (process.env.NODE_ENV === "production") {
  module.exports = require("./config_prod");
} else {
  try {
    module.exports = require("./config_dev");
  } catch (err) {
    console.warning("Development config not found. Using production config instead");

    module.exports = require("./config_prod");
  }
}
