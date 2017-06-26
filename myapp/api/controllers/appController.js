/*
 * [kiwi] NodeJS Controller
 * @author Thais Watanabe
 */
 'use strict';

 var mongoose = require('mongoose'),
 Product = mongoose.model('Products');

 var selectedProduct;

// //////////////
// Sensor Events

// discover if there is someone at the sensor
exports.there_is_someone = function(req, res) {
  var personData = req.body;
  //console.log("Received: " + personData.hasSomeone);
  // emitting socket io event
  global.io.emit('personEvent', personData); 
};

// discover which product is selected
exports.which_product = function(req, res) {
  if(selectedProduct != null) {
    res.end(selectedProduct._id.toString());
  }
};

// //////////////
// MongoDB CRUD

// list all products
exports.list_all_products = function(req, res) {
  Product.find({}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

// create a product
exports.create_a_product = function(req, res) {
  var new_product = new Product(req.body);
  new_product.save(function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

// read a product
exports.read_a_product = function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    // saving in session which product is selected
    selectedProduct = product;
    if (err)
      res.send(err);
    res.json(product);
    global.io.emit('productEvent', selectedProduct); 
  });
};

// update a product
exports.update_a_product = function(req, res) {
  Product.findOneAndUpdate(req.params.productId, req.body, {new: true}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

// delete a product
exports.delete_a_product = function(req, res) {
  Product.remove({
    _id: req.params.productId
  }, function(err, product) {
    if (err)
      res.send(err);
    res.json({ message: 'Product successfully deleted' });
  });
};
