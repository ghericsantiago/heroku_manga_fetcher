const express = require("express");
const path = require("path");
const mainRouter = require("./routers/main");
const serviceRouter = require("./routers/service");

const app = express();

app.use(express.static("./public"));

app.use("/service", serviceRouter);
app.use("*", mainRouter);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

module.exports = app;
