var sql = require('./db.js');

var User = function(user){
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.username = user.username;
}

User.createUser = function createUser(newUser, result) {    
    sql.query("INSERT INTO users set ?", newUser, function (err, res) { 
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};

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