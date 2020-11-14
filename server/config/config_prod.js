module.exports = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  maxAccounts: process.env.MAX_ACCOUNTS,
  bcrypt: {
    rounds: process.env.BCRYPT_ROUNDS
  },
  express: {
    session: {
      secret: process.env.SESSION_SECRET
    },
    cookie: {
      maxAge: process.env.COOKIE_MAX_AGE
    },
    cors: {
      origin: process.env.CORS_ORIGIN
    },
    rateLimiter: {
      limiters: {
        ip: {
          keyPrefix: process.env.RATELIMITER_IP_KEYPREFIX,
          points: process.env.RATELIMITER_IP_POINTS,
          duration: process.env.RATELIMITER_IP_DURATION,
          blockDuration: process.env.RATELIMITER_IP_BLOCKDURATION
        },
        loginSignup: {
          keyPrefix: process.env.RATELIMITER_LOGINSIGNUP_KEYPREFIX,
          points: process.env.RATELIMITER_LOGINSIGNUP_POINTS,
          duration: process.env.RATELIMITER_LOGINSIGNUP_DURATION,
          blockDuration: process.env.RATELIMITER_LOGINSIGNUP_BLOCKDURATION
        }
      },
      enabled: true
    }
  },
  passport: {
    strategies: {
      jwt: {
        accessSecretOrKey: process.env.ACCESS_SECRET_OR_KEY,
        accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
        refreshSecretOrKey: process.env.REFRESH_SECRET_OR_KEY,
        refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION
      }
    }
  }
};
