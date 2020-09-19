const isEmpty = require("./is-empty");

module.exports = data => {
  let errors = {};

  if (isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    valid: isEmpty(errors)
  };
};
