/*
 * Mongodb Models
 * @author Thais Watanabe
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Products', ProductSchema);