const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VideoSchema = new Schema({
    name: { type: String },
    video_id: { type: String },
    snippet: { type: String },
    contentDetails: { type: String },
    statistics: { type: String },
    status: { type: String },

});

module.exports = mongoose.model('Video', VideoSchema);