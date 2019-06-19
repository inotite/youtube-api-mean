const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: { type: String, required: true, max: 100},
    email: { type: String, required: true, max: 100},
    password: { type: String, required: true, max: 64 },
    phone: { type: String, },
    roles: { type: Array, default: ["USER"] },
    created_at: {
        type: Date,
        default: Date.now
    }
    // More Fields here
});

module.exports = mongoose.model('User', UserSchema);