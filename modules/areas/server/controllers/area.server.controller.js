'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Area = mongoose.model('Area'),
  validator = require('validator');

var whitelistedFields = ['firstName', 'lastName', 'email', 'username'];

/**
 * Update user details
 */
exports.create = function (req, res) {
  // Init Variables

  //todo(seb): add more error handling
  //todo(seb): add authorization conditions (if not user, etc)
  //todo(seb): add tests and logging

  var areaData = {
    polygonContour: {
      type: 'Polygon',
      coordinates: [req.body.points]
    }
  };

  var area = new Area(areaData);

  area.save(function(err, data) {
    if(err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(area);
      return res.json(area);
    }
  });
};

exports.areaById = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Area is invalid'
    });
  }

  Area.findById(id).exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.area = area;
    next();
  });
}
