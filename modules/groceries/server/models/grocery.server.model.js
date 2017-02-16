'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Grocery Schema
 */
var GrocerySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Grocery name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  item: {
    type: String,
    default: ''
  },
  items: {
    type: [],
    default: [],
    required: 'Please enter grocery items' 
  }
});

mongoose.model('Grocery', GrocerySchema);
