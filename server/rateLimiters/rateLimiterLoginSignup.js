const ms = require("ms");

const limiterConfig = require("../config").express.rateLimiter;
const loginSignupLimitConfig = limiterConfig.limiters.loginSignup;

module.exports = {
  keyPrefix: loginSignupLimitConfig.keyPrefix,
  points: loginSignupLimitConfig.points,
  duration: ms(loginSignupLimitConfig.duration) / 1000,
  blockDuration: ms(loginSignupLimitConfig.blockDuration) / 1000
};
