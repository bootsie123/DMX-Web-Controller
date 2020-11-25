const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ms = require("ms");

const jwtConfig = require("../config").passport.strategies.jwt;

const Schema = mongoose.Schema;

const AuthTokenSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  refreshToken: {
    type: String,
    default: function() {
      return AuthTokenSchema.statics.signRefreshToken(this.user._id);
    },
    required: true
  },
  expireAt: {
    type: Date,
    expires: 0,
    default: function() {
      return new Date(Date.now() + ms(jwtConfig.refreshTokenExpiration));
    },
    required: true
  },
  initialIp: {
    type: String,
    required: true
  },
  lastIp: String
}, { timestamps : {} });

AuthTokenSchema.pre("save", function(next) {
  this.lastIp = this.initialIp;

  next();
});

AuthTokenSchema.statics.decodeToken = function(refreshToken) {
  return jwt.verify(refreshToken, jwtConfig.refreshSecretOrKey);
}

AuthTokenSchema.statics.signRefreshToken = function(userId) {
  const payload = {
    user: {
      id: userId
    }
  };

  return jwt.sign(payload, jwtConfig.refreshSecretOrKey, { expiresIn: jwtConfig.refreshTokenExpiration });
}

AuthTokenSchema.methods.signRefreshToken = async function(lastIp = this.initialIp) {
  const newRefreshToken = AuthTokenSchema.statics.signRefreshToken(this.user._id);

  this.refreshToken = newRefreshToken;
  this.expireAt = new Date(this.expireAt.getTime() + ms(jwtConfig.refreshTokenExpiration));
  this.lastIp = lastIp;

  try {
    await this.save();

    return Promise.resolve(newRefreshToken);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = AuthToken = mongoose.model("authTokens", AuthTokenSchema); //eslint-disable-line no-undef
