const isEmpty = require("./is-empty");

module.exports = data => {
  let errors = {};

  if (isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (isEmpty(data.password2)) {
    errors.password2 = "Password confirmation field is required"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      valid: isEmpty(errors)
    };
  }

  if (data.username.trim().length <= 5) {
    errors.username = "Username must be greater than 5 characters";
  }

  if (data.email) {
    const emailParts = data.email.split("@");

    if (emailParts.length !== 2) {
      errors.email = "Email is invalid";
    } else {
      const emailName = emailParts[0];
      const emailDomain = emailParts[1].split(".");

      if (emailName.length <= 0 || emailDomain[0].length <= 0 || emailDomain[1].length <= 0) {
        errors.email = "Email is invalid";
      }
    }
  }

  if (data.password.trim().length <= 8) {
    errors.password = "Password must be greater than 8 characters";
  }

  if (data.password2 !== data.password) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    valid: isEmpty(errors)
  };
};
