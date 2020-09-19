const express = require("express");
const bcrypt = require("bcryptjs");

const maxAccounts = require("../config").maxAccounts;

const cleanBody = require("../middlewares/cleanBody");
const auth = require("../middlewares/auth");
const rateLimiterIpMiddleware = require("../middlewares/rateLimiterIp");

const validateRegisterInput = require("../validation/register");

const errorHandler = require("../handlers/routeErrorHandler");

const User = require("../models/User");
const AuthToken = require("../models/AuthToken");

const { validateUserId } = require("../utils/mongoose");

const router = express.Router();

/*
  @route POST api/users
  @desc Creates a new user
  @access Public
*/
router.post("/", [ rateLimiterIpMiddleware, cleanBody ], async (req, res, next) => {
  const { errors, valid } = validateRegisterInput(req.body);

  if (!valid) return errorHandler(res, 400, "Invalid input", errors);

  const { username, password } = req.body;

  try {
    const users = await User.estimatedDocumentCount();

    if (users > maxAccounts) return errorHandler(res, 400, "Maximum accounts reached");

    let user = await User.findOne({ username });

    if (user) return errorHandler(res, 400, "User already exists");

    user = new User({ username, password });

    const authToken = new AuthToken({ user: user.id, initialIp: req.ip });

    await user.save();
    await authToken.save();

    const accessToken = user.signAccessToken();
    const refreshToken = await authToken.refreshToken;

    res.set({ "x-auth-token": accessToken, "authorization": "Bearer " + accessToken });
    res.json({ status: 200, accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
