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

async function authenticate(username, password) {
    console.info(`authenticate( ${username} / ${password} )`);

    var user = await User.findOne({ username: username }).exec();

    if (!user || !await bcrypt.compare(password, user.password)) {
        console.log('User not found');
        return null;
    }

    console.info(`authenticateSuccess( ${username} )`);
    var token = createToken({username, password});
    return {
        accessToken: token,
    };
}

async function register(username, password, email, phone) {
  console.log(`register( register "${email}" with username and pw: ${username} / ${password} )`);

  await User.findOne({ username: username }, async function(err, ruser) {
    if (!ruser) {
        var user = new User();
        user.username = username;
        user.email = email;
        user.phone = phone;
        await bcrypt.hash(password, saltRounds, function(err, hash) {
          // Store hash in your password DB.

          user.password = hash;
          console.log(user);
          user.save(function (err) {
              if (err){
                  console.warn(`Can not save "${username}"`);
                  return null;
              }
              
              console.info(`registerSuccess( ${username} )`);
              return createToken({username, password})
          });
        });
        return;
    }

    console.warn(`registerFault( User "${username}" already exists. )`);
      return null;
  });
}

module.exports = {
  authenticate,
  register
};
