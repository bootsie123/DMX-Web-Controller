const strategies = require("../strategies");

const User = require("../models/User");

module.exports = passport => {
  for (let strategy of strategies) {
    passport.use(strategy);
  }

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);

      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
