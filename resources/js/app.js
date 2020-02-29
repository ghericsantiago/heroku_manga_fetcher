const React = require("react");
const reactDOM = require("react-dom");

import Home from "./components/home";

if (document.getElementById("app")) {
  console.log("ghericpogi");

  reactDOM.render(<Home />, document.getElementById("app"));
}
