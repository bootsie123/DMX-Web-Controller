const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtConfig = require("../config").passport.strategies.jwt;
const bcryptConfig = require("../config").bcrypt;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps : {} });

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await UserSchema.static.hashPassword(this.password);
  } catch (err) {
    next(err);
  }
});

UserSchema.static.hashPassword = function(password) {
  return bcrypt.hash(password, bcryptConfig.rounds);
}

UserSchema.methods.signAccessToken = function() {
  const payload = {
    user: {
      id: this.id
    }
  };

  return jwt.sign(payload, jwtConfig.accessSecretOrKey, { expiresIn: jwtConfig.accessTokenExpiration });
}

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.methods.toAuthUserJSON = function() {
  return {
    id: this._id,
    username: this.username,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
}

module.exports = User = mongoose.model("users", UserSchema);
