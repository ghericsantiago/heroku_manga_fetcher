const app = require("./app");
const http = require("http").createServer(app);
var io = require("socket.io")(http);
const { setIO, getIO } = require("./socket");

setIO(io);

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:fyh54HVD2HB4@cluster0-mbhc2.mongodb.net/mangas?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

getIO().on("connection", function(socket) {
  console.log("a user connected");

  socket.on("message", () => {
    console.log("hello world");
  });
});

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

http.listen(port, host, function(err) {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running at ${host}:${port}`);
});
