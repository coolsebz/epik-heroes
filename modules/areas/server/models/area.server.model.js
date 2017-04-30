'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  GeoJSON = require('mongoose-geojson-schema'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var AreaModel = new Schema({
  created: {
    type: Date,
    default: Date.now
  }, 
  polygonContour: {
    type: {
      type: String,
      required: true,
      enum: ['Polygon'],
    },
    coordinates: {
      type: [],
      required: true
    }
  }
  
});

mongoose.model('Area', AreaModel);
