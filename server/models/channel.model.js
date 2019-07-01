const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChannelSchema = new Schema({
    channel_id: { type: String },
    title: { type: String },
    created_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Channel', ChannelSchema);