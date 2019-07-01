const Channel = require('../models/channel.model');
const util = require('../util');

// Handle index actions
exports.index = function (req, res) {
    return Channel.find()
        .then((channels) => {
            return util.createSuccessResponse( res, channels, 200, "Get Channels Successfully");
        })
        .catch( err => {
            return util.createErrorResponse( res, 400, err );
        });
};

// Handle create channel actions
exports.new = function (req, res) {
    return Channel.findOne({ channel_id: req.body.channel_id })
        .then((rchannel) => {
            if (!rchannel) {
                var channel = new Channel();
                channel.channel_id = req.body.channel_id
                channel.title = req.body.title;

                return channel.save();
            }
            throw 'Channel already exists!';
        })
        .then((channel) => {
            console.log("New channel created!");
            return util.createSuccessResponse(res, channel, 200, "Channel Created Successfully");
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};

// Handle view channel info
exports.view = function (req, res) {
    return Channel.findById(req.params.channel_id)
        .then((channel) => {
            console.log('Channel details loading..');
            return util.createSuccessResponse(res, channel, 200, "Channel details loading...");
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};

// Handle update channel info
exports.update = function (req, res) {
    return Channel.findById(req.params.channel_id)
        .then((channel) => {
            channel.channel_id = req.body.channel_id
            channel.title = req.body.title;

            console.log(req.body);
            return channel.save();
        })
        .then((channel) => {
            console.log('Channel Info updated');
            return util.createSuccessResponse(res, channel, 200, "Channel Info updated");
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};
// Handle delete channel
exports.delete = function (req, res) {
    return Channel.remove({ _id: req.params.channel_id })
        .then(_id => {
            console.log(_id);
            console.log("Channel Deleted");
            return util.createSuccessResponse(res, req.params.channel_id, 200, "Channel Deleted");
        })
        .catch(err => {
            console.log(err);
            return util.createErrorResponse(res, 400, err);
        });
};