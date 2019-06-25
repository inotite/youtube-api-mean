const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VideoSchema = new Schema({
    video_id: { type: String },
    title: { type: String },
    description: { type: String },
    tags: { type: String },
    total_views: { type: Number },
    likes: { type: Number },
    dislikes: { type: Number },
    current_viewers: { type: Number },
    joining_viewers: { type: Number },
    leaving_viewers: { type: Number },
    comment_count: { type: Number },
    published_at: { type: String },
    duration: { type: String },
});

module.exports = mongoose.model('Video', VideoSchema);