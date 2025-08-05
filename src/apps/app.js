const express = require("express");
const session = require("express-session");
const config = require("config");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
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





app.use(require(config.get("router")));
module.exports = app;
