const express = require("express");
const router = express.Router();

const rateLimiterIp = require("../middlewares/rateLimiterIp");

// @route GET api/test
// @desc Tests access to the API
// @access Public
router.get("/", rateLimiterIp, (req, res) => res.json({ status: 200, message: "Reachable" }));

module.exports = router;
