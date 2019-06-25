const jwt = require("jsonwebtoken");
const config = require("../config.json");
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Create a reference to our mocked out users database.
const User = require("../models/user.model");

// Create a token from a payload.
function createToken(payload) {
  const jwtConfig = {
    expiresIn: config.jwt.expiresIn
  };
  return jwt.sign(payload, config.jwt.secretKey, jwtConfig)
}

module.exports = {
    authenticate: (username, password) => {
        console.info(`authenticate( ${username} / ${password} )`);

        return User.findOne({ username: username })
            .then(user => {
                if (user) {
                    return bcrypt.compare(password, user.password)
                        .then(res => {
                            console.info(`authenticateSuccess( ${username} )`);
                            var token = createToken({username, password});
                            console.log(token);
                            console.log('A');
                            return {
                                accessToken: token,
                                role: user.roles
                            };
                        });
                }
                throw 'User not found';
            })
            .catch(err => {
                console.log( "Error :" + err );
                return null;
            });
    },
    register: (username, password, email, phone) => {
        console.log(`register( register "${email}" with username and pw: ${username} / ${password} )`);

        return User.findOne({ username: username })
                .then((ruser) => {
                    if (!ruser) {
                        var user = new User();
                        user.username = username;
                        user.email = email;
                        user.phone = phone;
                        return bcrypt.hash(password, saltRounds)
                                .then((hash) => {
                                    // Store hash in your password DB.
                                    user.password = hash;
                                    return user.save();
                                })
                                .then((user) => {
                                    console.info(`registerSuccess( ${username} )`);
                                    return createToken({username, password})
                                });
                    }
                    throw 'User already exist';
                })
                .catch(err => {
                    console.log(err);
                    return null;
                });
    }
};
