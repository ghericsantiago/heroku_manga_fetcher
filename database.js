var admin = require("firebase-admin");

var serviceAccount = require("./keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mangas-5c521.firebaseio.com"
});

// The app only has access as defined in the Security Rules
module.exports = admin.database();
