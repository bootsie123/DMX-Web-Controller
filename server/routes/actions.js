const express = require("express");

const actions = require("../lib/actions");

const auth = require("../middlewares/auth"); //eslint-disable-line no-unused-vars
const cleanBody = require("../middlewares/cleanBody"); //eslint-disable-line no-unused-vars

const errorHandler = require("../handlers/routeErrorHandler"); //eslint-disable-line no-unused-vars

const router = express.Router();

// @route GET api/actions
// @desc Gets a list of available actions
// @access private
router.get("/", auth, (req, res) => {
  const actionList = actions.getActions().map(action => actions.actionToJSON(action));

  res.json({ status: 200, actions: actionList });
});

// @route POST api/actions/{actionId}/run
// @desc Runs an action of a specified ID
// @access private
router.post("/:actionId/run", auth, (req, res) => {
  const actionId = req.params.actionId;

  if (!actions.hasAction(actionId)) {
    return errorHandler(res, 404, "Action not found");
  }

  actions.runAction(req.params.actionId);

  const action = actions.getActionById(actionId);

  res.json({ status: 200, action: actions.actionToJSON(action) });
});

// @route POST api/actions/{actionId}/stop
// @desc Stops an action of a specified ID
// @access private
router.post("/:actionId/stop", auth, (req, res) => {
  const actionId = req.params.actionId;

  if (!actions.hasAction(actionId)) {
    return errorHandler(res, 404, "Action not found");
  }

  actions.stopAction(req.params.actionId);

  const action = actions.getActionById(actionId);

  res.json({ status: 200, action: actions.actionToJSON(action) });
});

module.exports = router;
