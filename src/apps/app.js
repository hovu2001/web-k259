const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const config = require("config");
require("../../config/passport")
const bodyParser = require("body-parser");
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/static", express.static(config.get("staticFolder")));
app.set("views", config.get("viewsFolder"));
app.set("view engine", config.get("viewEngine"));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "vietpro_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());



app.use(require(config.get("router")));
module.exports = app;
