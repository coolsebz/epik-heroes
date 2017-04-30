'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  AreaController = require(path.resolve('./modules/areas/server/controllers/area.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Area = mongoose.model('Area'),
  HelpRequest = mongoose.model('HelpRequest'),

  validator = require('validator');

var whitelistedFields = ['firstName', 'lastName', 'email', 'username'];

var signalThreshold = 2;

/**
 * Update user details
 */
exports.create = function (req, res) {
  // Init Variables

  //todo(seb): add more error handling
  //todo(seb): add authorization conditions (if not user, etc)
  //todo(seb): add tests and logging

   Area.findById(req.body.area).exec(function(err, area) {

    console.log(area);
    var signal = new HelpRequest(req.body);

    signal.user = req.user;
    signal.area = area;

    signal.save(function(err, data) {

      if(err) {
        console.log(err);
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {

        return res.json(signal);
      }
    });
  });
};

/**
 * Update profile picture
 */
// exports.getAlerts = function (req, res) {
//   // get an area
//   console.log(req.query);

//   var geoJsonPoint = { type: 'Point', coordinates: [parseFloat(req.query.lat), parseFloat(req.query.long)] }
//   Area.find({ polygonContour: { $geoIntersects: { $geometry: geoJsonPoint }}}, function(err, area) {

//     if(area.length === 0) {
//       return res.json({ isAlert: false, area: '' });
//     }

//     DistressSignal.count({ area: area[0]._id }).exec(function(err, noOfDistressSignals) {

//       //todo(seb): extract the duplicate code out
//       if(noOfDistressSignals > signalThreshold) { 
//         return res.json({ isAlert: true, area: area[0]._id });
//       } else {
//         return res.json({ isAlert: false, area: area[0]._id });
//       }
//     })
//   });

// };
