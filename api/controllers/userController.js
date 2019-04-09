var User = require('../models/userModel.js');

exports.getUserById = function(req, res) {
    User.getUserById(req.params.userId, function(err, user) {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.login = function(req, res) {
    User.login(req.params.email, req.params.password, function(err) {
    if(err){
        res.send(err);
    }
    res.json()
    });
};

exports.createUser = function(req, res) {
    var newUser = new User(req.body);
    if(!newUser.username && !newUser.password){
        res.status(400).send({ error:true, message: "Required fields not included." });
    }
    else{
        User.createUser(newUser, function(err, user) {
            if(err) {
                res.send(err);
            }
            res.json(user);
        });
    }
};

exports.updateUser = function(req, res) {
    User.updateUser(req.params.userId, new User(req.body), function(err, user) {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
};