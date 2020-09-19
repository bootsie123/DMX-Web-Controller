const sanitizer = require("sanitizer");

module.exports = (req, res, next) => {
  try {
    for (let [k, v] of Object.entries(req.body)) {
      req.body[k] = sanitizer.sanitize(v);
    }

    next();
  } catch (err) {
    next(err);
  }
}
