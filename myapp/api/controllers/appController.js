'use strict';

var mongoose = require('mongoose'),
Product = mongoose.model('Products');


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
    if (err)
      res.send(err);
    res.json(product);
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