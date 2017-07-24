/*
 * [records] NodeJS Controller
 * @author Thais Watanabe
 */
 'use strict';

 var mongoose = require('mongoose'),
 Record = mongoose.model('Records');

 var selectedRecord;

// //////////////
// Sensor Events

// discover if there is someone at the sensor
exports.there_is_someone = function(req, res) {
  var personData = req.body;
  //console.log("Received: " + personData.hasSomeone);
  // emitting socket io event
  global.io.emit('personEvent', personData); 
};

// discover which record is selected
exports.which_record = function(req, res) {
  if(selectedRecord != null) {
    res.end(selectedRecord._id.toString());
  } else {
    res.end('null');
  }
};

// //////////////
// MongoDB CRUD

// list all records
exports.list_all_records = function(req, res) {
  Record.find({}, function(err, record) {
    if (err)
      res.send(err);
    res.json(record);
  });
};

// create a record
exports.create_a_record = function(req, res) {
  var new_record = new Record(req.body);
  new_record.save(function(err, record) {
    if (err)
      res.send(err);
    res.json(record);
  });
};

// read a record
exports.read_a_record = function(req, res) {
  Record.findById(req.params.recordId, function(err, record) {
    // saving in session which record is selected
    selectedRecord = record;
    if (err)
      res.send(err);
    res.json(record);
  });
};

// logic for the selected record
exports.select_the_record = function(req, res) {
  if (req.params.recordId == 'none') {
    selectedRecord = null;
    res.end('OK!');
    global.io.emit('recordEvent', selectedRecord); 
  } else {
    Record.findById(req.params.recordId, function(err, record) {
    // saving in session which record is selected
    selectedRecord = record;
    if (err)
      res.send(err);
    res.end('OK!');
    global.io.emit('recordEvent', selectedRecord); 
  });
  }
};

exports.select_the_record_post = function(req, res) {
  if (req.params.recordId == 'none') {
    selectedRecord = null;
    res.end('OK!');
    global.io.emit('recordEvent', selectedRecord); 
  } else {
    Record.findById(req.params.recordId, function(err, record) {
    // saving in session which record is selected
    selectedRecord = record;
    if (err)
      res.send(err);
    res.end('OK!');
    global.io.emit('recordEvent', selectedRecord); 
  });
  }
};

exports.select_the_record_p = function(req, res) {
  if (req.body.id == 'none') {
    selectedRecord = null;
    res.end('OK!');
    global.io.emit('recordEvent', selectedRecord); 
  } else {
    Record.findById(req.body.id, function(err, record) {
    // saving in session which record is selected
    selectedRecord = record;
    if (err)
      res.send(err);
    res.end('OK!');
    global.io.emit('recordEvent', selectedRecord); 
  });
  }
};

// clear the selected record
exports.clear_selected_record = function(req, res) {
  selectedRecord = null;
  res.end('OK!');
};

// update a record
exports.update_a_record = function(req, res) {
  Record.findOneAndUpdate(req.params.recordId, req.body, {new: true}, function(err, record) {
    if (err)
      res.send(err);
    res.json(record);
  });
};

// delete a record
exports.delete_a_record = function(req, res) {
  Record.remove({
    _id: req.params.recordId
  }, function(err, record) {
    if (err)
      res.send(err);
    res.json({ message: 'Record successfully deleted' });
  });
};
