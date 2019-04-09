var firebase = require("firebase/app");
require("firebase/auth");

var config = {
    apiKey: "AIzaSyDPFdRIC_jMSkPLGrCj2zGgyS1rgi1AhEc",
    authDomain: "kanso-f471f.firebaseapp.com",
    projectId: "kanso-f471f",
    messagingSenderId: "659340357175",
  };

firebase.initializeApp(config);

module.exports = firebase;