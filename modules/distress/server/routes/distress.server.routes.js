'use strict';

module.exports = function (app) {
  // User Routes
  var distress = require('../controllers/distress.server.controller');

  // adding a new distress message
  app.route('/api/distress/signals').post(distress.create);

  // route that the users will poll to get the latest alerts
  app.route('/api/distress/signals').get(distress.getAlerts);

  
  // app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  // app.route('/api/users/password').post(users.changePassword);
  // app.route('/api/users/picture').post(users.changeProfilePicture);

  // Finish by binding the user middleware
  // app.param('userId', users.userByID);
};
