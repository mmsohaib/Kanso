var sql = require('./db.js');
var firebase = require("./firebase.js");

var User = function(user){
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.state = user.state;
    this.city = user.city;
};

User.createUser = function createUser(newUser, result) {
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ":" + errorMessage)
    });

    var user = firebase.auth().currentUser;
    //while(!user){
    //    user = firebase.auth().currentUser;
    //}

    if (user) {
        console.log(user.uid);
        newUser.id = user.uid;
      } else {
        console.log("error");
      }
    
    // var query = "INSERT INTO users (u_id, first_name, last_name, email, username, u_state, u_city) VALUES ?";
    // var values = [newUser.id, newUser.firstName, newUser.lastName, newUser.email, newUser.state, newUser.city]
    // sql.query(query, values, newUser, function (err, res) { 
    //     if(err) {
    //         console.log("error: ", err);
    //         result(err, null);
    //     }
    //     else {
    //         console.log(res.insertId);
    //         result(null, res.insertId);
    //     }
    // });           
};

User.login = function login(email, password, result) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        result(errorCode + " : " + errorMessage, null);
      });
}

User.getUserById = function getUserById(userId, result) {
    sql.query("SELECT * from users where u_id = ?", userId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);  
        }
    });   
};

User.updateById = function(id, user, result){
    sql.query("UPDATE users SET user = ? WHERE id = ?", [user.firstname, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{   
            result(null, res);
        }
    }); 
};

module.exports=User;