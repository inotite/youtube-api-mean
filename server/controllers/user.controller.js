const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Handle index actions
exports.index = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: users.map( user => ({id: user._id, username: user.username, email: user.email, phone: user.phone, password: user.password, roles: user.roles}))
        });
    });
};

// Handle create user actions
exports.new = async function (req, res) {
    await User.findOne({ username: req.body.username }, async function(err, ruser) {
        if (!ruser) {
            var user = new User();
            user.username = req.body.username;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.roles = req.body.roles.length > 0 ? req.body.roles : user.roles;

            await bcrypt.hash(password, saltRounds, function(err, hash) {
              // Store hash in your password DB.
    
                user.password = hash;
                console.log(user);
                user.save(function (err) {
                    if (err){
                        console.warn(`Can not save "${req.body.username}"`);
                        res.json(err);
                    }
                    
                    res.json({
                        message: 'New user created!',
                        data: user
                    });
                });
            });
            return;
        }
    
        console.warn(`registerFault( User "${username}" already exists. )`);
          return null;
    });
};

// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

// Handle update user info
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.username = req.body.name ? req.body.name : user.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.phone = req.body.phone;
        user.roles = req.body.roles.length > 0 ? req.body.roles : user.roles;
        
        // save the user and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
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
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};