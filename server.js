const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    port = process.env.PORT || 3000;
    app.set("view engine", "ejs"); //set ejs as default engine
    app.use(express.static("public")); //set to public static path .

const mysql = require('mysql');
// connection configurations
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kanso'
});

var firebase = require("firebase/app");
require("firebase/auth");
 
// connect to database
conn.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var config = {
    apiKey: "AIzaSyDPFdRIC_jMSkPLGrCj2zGgyS1rgi1AhEc",
    authDomain: "kanso-f471f.firebaseapp.com",
    projectId: "kanso-f471f",
    messagingSenderId: "659340357175",
  };

firebase.initializeApp(config);

var routes = require('./api/routes/listingRoutes'); //importing route
routes(app); //register the route