var mongoose = require('mongoose'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt'),

User = require('../model/userModel');
exports.register = function(req, res) {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hash_password = undefined;
        return res.json(user);
      }
    });
  };
  
  exports.sign_in = function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
    });
  };
  
  exports.loginRequired = function(req, res, next) {
    if (req.user) {
      next();
    } else {
  
      return res.status(401).json({ message: 'Unauthorized user!!' });
    }
  };
  exports.profile = function(req, res, next) {
    if (req.user) {
      res.send(req.user);
      next();
    } 
    else {
     return res.status(401).json({ message: 'Invalid token' });
    }
  };



// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};
// Handle create user actions

exports.new = function (req, res) {
    var user = new User();
    user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
    user.subname = req.body.subname;
    user.administrator = req.body.administrator;
    user.phone = req.body.phone;
    user.mail = req.body.mail;
    user.password = bcrypt.hashSync(req.body.password, 10);
// save the user and check for errors
    user.save(function (err) {
         if (err)
         {
            if (err.keyPattern)
            if (err.keyPattern.phone == 1)
                res.status(400).json("Istnieje uzytkownik o podanym numerze telefonu."); //TODO: obsługa błędów.
            else
                res.status(400).json(err);
         }
         else
         {
            res.json({
                id: user.id
            });
         }
    });
};
// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.status(400).send(err);
        res.json({
            data: user
        });
    });
};
// Handle update user info
exports.update = function (req, res) {
User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.status(400).send(err);
user.name = req.body.name ? req.body.name : user.name;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user.phone = req.body.phone;
// save the user and check for errors
        user.save(function (err) {
            if (err)
                res.status(400).json(err);
            res.json({
                id: user.user_id
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.status(400).send(err);
res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};