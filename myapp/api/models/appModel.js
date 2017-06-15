'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
  name: {
    type: String,
    Required: 'Enter the name of the product'
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Product', ProductSchema);