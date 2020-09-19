const fs = require("fs");
const path = require("path");

const strategies = require("../strategies");

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
