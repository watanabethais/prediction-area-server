/*
 * [records] Mongodb Models
 * @author Thais Watanabe
 */
 'use strict';

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;


 var RecordSchema = new Schema({
 	name: {
 		type: String,
 		required: true
 	},
 	artist: {
 		type: String,
 		required: true
 	},
 	description: {
 		type: String
 	},
 	photoName: {
 		type: String
 	},
 	Created_date: {
 		type: Date,
 		default: Date.now
 	}

 });

 module.exports = mongoose.model('Records', RecordSchema);