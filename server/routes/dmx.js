const express = require("express");
const fetch = require("node-fetch");

const OLAAPI = require("../lib/OLAAPI");

const auth = require("../middlewares/auth");
const cleanBody = require("../middlewares/cleanBody");

const errorHandler = require("../handlers/routeErrorHandler");

const router = express.Router();

// @route GET api/dmx
// @desc Gets the DMX settings for a universe
// @access private
router.get("/", auth({optional: true}), async (req, res, next) => {
  try {
    const dmx = await OLAAPI.getDMX(1);

    res.json({ status: 200, dmx });
  } catch (err) {
    next(err);
  }
});

// @route POST api/dmx
// @desc Updates the DMX settings
// @access Private
router.post("/", [ auth, cleanBody ], async (req, res, next) => {
  const { universe, dmx } = req.body;

  try {
    await OLAAPI.setDMX(universe || 1, dmx);

    res.json({ status: 200 });
  } catch (err) {
    next(err);
  }
});

// @route GET api/dmx/info
// @desc Gets the OLA server info
// @access Private

router.get("/info/:universe?", auth, async (req, res, next) => {
  try {
    const stats = await OLAAPI.serverStats(req.params.universe || 1);

    res.json({ status: 200, stats });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
