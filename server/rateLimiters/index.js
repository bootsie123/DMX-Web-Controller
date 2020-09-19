const { RateLimiterMongo } = require("rate-limiter-flexible");
const mongoose = require("mongoose");

const limiterConfig = require("../config").express.rateLimiter;

const rateLimiterIp = require("./rateLimiterIp");
const rateLimiterLoginSignup = require("./rateLimiterLoginSignup");

const configure = options => {
  options.storeClient = mongoose.connection;

  if (!limiterConfig.enabled) {
    options.blockDuration = 1;
  }

  return new RateLimiterMongo(options);
}

module.exports = {
  rateLimiterIp: configure(rateLimiterIp),
  rateLimiterLoginSignup: configure(rateLimiterLoginSignup)
};
