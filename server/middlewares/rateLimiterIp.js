const { rateLimiterIp } = require("../rateLimiters");

const errorHandler = require("../handlers/routeErrorHandler");

module.exports = (req, res, next) => {
  rateLimiterIp.consume(req.ip)
    .then(() => next())
    .catch(() => errorHandler(res, 429, "Too many requests"));
}
