const passport = require("passport");

const { rateLimiterIp } = require("../rateLimiters");

const errorHandler = require("../handlers/routeErrorHandler");

module.exports = (options, res, next) => {
  if (res && next) {
    auth({}, options, res, next);
  } else {
    return (req, res, next) => {
      auth(options, req, res, next);
    }
  }
}

function auth(options, req, res, next) {
  if (req.isAuthenticated()) return next();

  const callback = () => {
    const token = req.header("x-auth-token") || req.header("authorization");

    if (!token) {
      if (options.optional) return next();

      return errorHandler(res, 401, "No bearer token");
    }

    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) return next(err);

      if (!user && options.optional) return next();

      if (!user) {
        if (info.name === "TokenExpiredError") return errorHandler(res, 401, "Token expired");

        return errorHandler(res, 401, info.message[0].toUpperCase() + info.message.slice(1));
      }

      req.logIn(user, err => {
        if (err) return next(err);

        if (options.optional) return next();

        rateLimiterIp.reward(req.ip)
          .then(() => next())
          .catch(err => next(err));
      });
    })(req, res, next);
  };

  if (options.optional) {
    callback();
  } else {
    rateLimiterIp.consume(req.ip)
      .then(callback)
      .catch(() => errorHandler(res, 429, "Too many requests"));
  }
}
