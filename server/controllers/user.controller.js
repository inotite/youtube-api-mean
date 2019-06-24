const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const util = require('../util');

const saltRounds = 10;

// Handle index actions
exports.index = function (req, res) {
    return User.find()
        .then((users) => {
            return util.createSuccessResponse( res, users, 200, "Get Users Successfully");
        })
        .catch( err => {
            return util.createErrorResponse( res, 400, err );
        });
};

// Handle create user actions
exports.new = function (req, res) {
    return User.findOne({ username: req.body.username })
        .then((ruser) => {
            if (!ruser) {
                var user = new User();
                user.username = req.body.username;
                user.email = req.body.email;
                user.phone = req.body.phone;
                user.roles = req.body.role ? req.body.role : user.roles;

                return bcrypt.hash(req.body.password, saltRounds)
                    .then((hash) => {
                        user.password = hash;
                        return user.save();
                    })
                    .then((user) => {
                        console.log("New user created!");
                        return util.createSuccessResponse(res, user, 200, "User Created Successfully");
                    });
            }
            throw 'User already exists!';
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};

// Handle view user info
exports.view = function (req, res) {
    return User.findById(req.params.user_id)
        .then((user) => {
            console.log('User details loading..');
            return util.createSuccessResponse(res, user, 200, "User details loading...");
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};

// Handle update user info
exports.update = function (req, res) {
    return User.findById(req.params.user_id)
        .then((user) => {
            user.username = req.body.name ? req.body.name : user.username;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.roles = req.body.role ? req.body.role : user.roles;

            console.log(req.body);
            
            return bcrypt.hash(req.body.password, saltRounds)
                .then((hash) => {
                    // save the user and check for errors
                    user.password = hash;

                    return user.save();
                })
                .then((user) => {
                    console.log('User Info updated');
                    return util.createSuccessResponse(res, user, 200, "User Info updated");
                });
            
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};
// Handle delete user
exports.delete = function (req, res) {
    return User.remove({ _id: req.params.user_id })
        .then(_id => {
            console.log(_id);
            console.log("User Deleted");
            return util.createSuccessResponse(res, req.params.user_id, 200, "User Deleted");
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};