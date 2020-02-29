const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send("Welcome");
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => {
  console.log(`Running on ${host}:${port}`);
});
