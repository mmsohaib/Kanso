var User = require('../models/userModel.js');

exports.getUserById = function(req, res) {
    User.getUserById(req.params.userId, function(err, user) {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.createUser = function(req, res) {
    var newUser = new User(req.body);
    if(!newUser.username){
        res.status(400).send({ error:true, message: 'Please provide user' });
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