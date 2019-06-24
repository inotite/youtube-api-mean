let router = require('express').Router();

var userController = require('./controllers/user.controller.js');
var videoController = require('./controllers/video.controller.js');

router.route('/users')
    .get(userController.index)
    .post(userController.new);

router.route('/user/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

router.route('/videos')
    .get(videoController.index)
    .post(videoController.new);

router.route('/video/:video_id')
    .get(videoController.view)
    .patch(videoController.update)
    .put(videoController.update)
    .delete(videoController.delete);

module.exports = router;