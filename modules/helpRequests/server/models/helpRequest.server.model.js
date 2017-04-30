'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var HelpRequest = new Schema({
  created: {
    type: Date,
    default: Date.now
  },

  loc: {
    type: {
      type: String,
      enum: ['Point'],
      requried: true,
    }, 
    coordinates: {
      type: [Number],
      required: true
    }
  },
  area: {
    type: Schema.ObjectId, 
    ref: 'Area',
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('HelpRequest', HelpRequest);
