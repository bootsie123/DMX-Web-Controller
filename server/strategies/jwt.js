const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtConfig = require("../config").passport.strategies.jwt;

const User = require("../models/User");

const { validObjectId } = require("../utils/mongoose");

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([ ExtractJwt.fromHeader("x-auth-token"), ExtractJwt.fromAuthHeaderAsBearerToken() ]),
  secretOrKey: jwtConfig.accessSecretOrKey
};

module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const invalidToken = "Invalid token";

    if (!validObjectId(jwt_payload.user.id)) {
      return done(null, false, invalidToken);
    }

    const user = await User.findById(jwt_payload.user.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false, invalidToken);
    }
  } catch (err) {
    done(err);
  }
});
