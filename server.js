const config = require("./server/config");
const express = require("express");
const session = require("express-session");
const mongoSanitzie = require("express-mongo-sanitize");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const passport = require("passport");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const fs = require("fs");

const expressConfig = config.express;

const passportConfig = require("./server/config/passport");

const nodeErrorHandler = require("./server/handlers/nodeErrorHandler");
const errorHandler = require("./server/handlers/routeErrorHandler");

const app = express();

const PORT = config.port || 5000;
const DB = config.mongoURI;

const production = app.get("env") === "production";

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: !production,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.info("MongoDB connected");

  const routes = fs.readdirSync(__dirname + "/server/routes");

  for (let route of routes) {
    app.use("/" + route.split(".")[0], require("./server/routes/" + route));
  }

  app.use((err, req, res, next) => {
    console.error(err);

    errorHandler(res, "Interal server error");
  });

  app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
})
  .catch(err => console.error("Error setting up connection to MongoDB", err));

if (production) {
  app.set("trust proxy", 1);
}

app.use(session({
  secret: expressConfig.session.secret,
  name: "DMX Web Controller",
  resave: false,
  saveUninitialized: false,
  cookie: {
    proxy: true,
    httpOnly: true,
    sameSite: "strict",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secure: production,
    maxAge: expressConfig.cookie.maxAge
  }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(compression());
app.use(helmet({ policy: "same-origin" }));
app.use(mongoSanitzie({ replaceWith: "_" }));
app.use(cors({ origin: expressConfig.cors.origin }));

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);
