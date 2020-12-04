module.exports = {
  port: parseInt(process.env.PORT) || 8080,
  mongoURI: process.env.MONGO_URI || "mongodb://mongodb:27017/db",
  maxAccounts: parseInt(process.env.MAX_ACCOUNTS) || 1,
  dmx: {
    olaAPI: process.env.OLA_API || "localhost:9090/",
    defaultDMXMode: parseInt(process.env.DEFAULT_DMX_MODE) || 4
  },
  bcrypt: {
    rounds: parseInt(process.env.BCRYPT_ROUNDS) || 10
  },
  express: {
    session: {
      secret: process.env.SESSION_SECRET || "SESSION_SECRET"
    },
    cookie: {
      maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 86400000
    },
    cors: {
      origin: process.env.CORS_ORIGIN === "true"
    },
    rateLimiter: {
      limiters: {
        ip: {
          keyPrefix: "rateLimiter-IP",
          points: parseInt(process.env.RATELIMITER_IP_POINTS) || 100,
          duration: process.env.RATELIMITER_IP_DURATION || "1d",
          blockDuration: process.env.RATELIMITER_IP_BLOCKDURATION || "1d"
        },
        loginSignup: {
          keyPrefix: "rateLimiter-LoginSignup",
          points: parseInt(process.env.RATELIMITER_LOGINSIGNUP_POINTS) || 10,
          duration: process.env.RATELIMITER_LOGINSIGNUP_DURATION || "90d",
          blockDuration: process.env.RATELIMITER_LOGINSIGNUP_BLOCKDURATION || "1h"
        }
      },
      enabled: true
    }
  },
  passport: {
    strategies: {
      jwt: {
        accessSecretOrKey: process.env.ACCESS_SECRET_OR_KEY || "ACCESS_SECRET_OR_KEY",
        accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || "30m",
        refreshSecretOrKey: process.env.REFRESH_SECRET_OR_KEY || "REFRESH_SECRET_OR_KEY",
        refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || "5d"
      }
    }
  }
};
