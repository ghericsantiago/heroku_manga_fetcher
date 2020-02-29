const app = require("./app");

// Browsersync
// if (app.get("env") === "development") {
//   var browserSync = require("browser-sync");
//   var bs = browserSync.create().init({ logSnippet: false });
//   app.use(require("connect-browser-sync")(bs));
// }

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running at ${host}:${port}`);
});
