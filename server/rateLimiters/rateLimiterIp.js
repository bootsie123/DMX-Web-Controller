const ms = require("ms");

const limiterConfig = require("../config").express.rateLimiter;
const ipLimitConfig = limiterConfig.limiters.ip;

module.exports = {
  keyPrefix: ipLimitConfig.keyPrefix,
  points: ipLimitConfig.points,
  duration: ms(ipLimitConfig.duration) / 1000,
  blockDuration: ms(ipLimitConfig.blockDuration) / 1000
};
