const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const { rateLimiterIp } = require("../rateLimiters");
const errorHandler = require("../handlers/routeErrorHandler");

// @route GET api/test
// @desc Tests access to the API
// @access Public
router.get("/", auth({ optional: true }), async (req, res, next) => {
  try {
    if (!req.user) {
      await rateLimiterIp.consume(req.ip);
    }

    res.json({ status: 200, message: "Reachable" })
  } catch (err) {
    if (err instanceof Error) return next(err);

    res.set("rety-after", Math.round(err.msBeforeNext / 1000) || 1);

    return errorHandler(res, 429, "Too many requests");
  }
});

module.exports = router;
