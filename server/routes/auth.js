const express = require("express");

const loginSignupLimitConfig = require("../config").express.rateLimiter.limiters.loginSignup;

const cleanBody = require("../middlewares/cleanBody");
const auth = require("../middlewares/auth");
const rateLimiterIpMiddleware = require("../middlewares/rateLimiterIp");

const { rateLimiterIp, rateLimiterLoginSignup } = require("../rateLimiters");

const validateLoginInput = require("../validation/login");

const errorHandler = require("../handlers/routeErrorHandler");

const User = require("../models/User");
const AuthToken = require("../models/AuthToken");

const router = express.Router();

/*
  @route GET api/auth
  @desc Get logged in user info
  @access Private
*/
router.get("/", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({ status: 200, user: user.toAuthUserJSON() });
  } catch (err) {
    next(err);
  }
});

/*
  @route POST api/auth
  @desc Authenticate user
  @access Public
*/
router.post("/", [ rateLimiterIpMiddleware, cleanBody ], async (req, res, next) => {
  try {
    const userLimitKey = req.body.username + "-" + req.ip;

    const userRateLimit = rateLimiterLoginSignup.get(userLimitKey);

    if (userRateLimit !== null && userRateLimit.consumedPoints > loginSignupLimitConfig.points) {
      res.set("rety-after", Math.round(userRateLimit.msBeforeNext / 1000) || 1);

      return errorHandler(res, 429, "Too many requests");
    }

    const { errors, valid } = validateLoginInput(req.body);

    if (!valid) {
      await rateLimiterIp.consume(req.ip);

      return errorHandler(res, 400, "Invalid input", errors);
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const invalidCredentials = "Username or password is incorrect";

    if (!user) {
      await rateLimiterIp.consume(req.ip);

      return errorHandler(res, 400, invalidCredentials);
    }

    const match = await user.comparePassword(password);

    if (!match)  {
      await rateLimiterLoginSignup.consume(userLimitKey);

      return errorHandler(res, 400, invalidCredentials);
    }

    if (userRateLimit) await rateLimiterLoginSignup.delete(userLimitKey);

    const accessToken = user.signAccessToken();
    const authToken = new AuthToken({ user: user.id, initialIp: req.ip });

    await authToken.save();

    const refreshToken = await authToken.refreshToken;

    res.set({ "x-auth-token": accessToken, "authorization": "Bearer " + accessToken });
    res.json({ status: 200, accessToken, refreshToken });
  } catch (err) {
    if (err instanceof Error) return next(err);

    res.set("rety-after", Math.round(err.msBeforeNext / 1000) || 1);

    return errorHandler(res, 429, "Too many requests");
  }
});

/*
  @route POST api/auth/token
  @desc Signs a new access token with a refresh token
  @access Private
*/
router.post("/token", cleanBody, async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return errorHandler(res, 400, "No refresh token");

  try {
    const decodedToken = AuthToken.decodeToken(refreshToken);
    const authToken = await AuthToken.findOne({ user: decodedToken.user.id, refreshToken }).populate("user");

    if (!authToken || authToken.expireAt < Date.now()) return errorHandler(res, 403, "Refresh token expired");

    const newAccessToken = authToken.user.signAccessToken();
    const newRefreshToken = await authToken.signRefreshToken();

    res.set({ "x-auth-token": newAccessToken, "authorization": "Bearer " + newAccessToken });
    res.json({ status: 200, accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    if (err.name === "TokenExpiredError" || (err.name === "JsonWebTokenError" && err.message === "invalid signature")) {
      return errorHandler(res, 403, "Invalid refresh token");
    }

    next(err);
  }
});

/*
  @route POST api/auth/logout
  @desc Logs out the current user
  @access Private
*/
router.post("/logout", auth, (req, res) => {
  req.logout();
  req.session.destroy();

  res.json({ status: 200, message: "User logged out" })
});

module.exports = router;
