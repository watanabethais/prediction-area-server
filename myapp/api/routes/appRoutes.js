/*
 * NodeJS Routes
 * @author Thais Watanabe
 */
'use strict';

module.exports = function(app, io) {
  var productList = require('../controllers/appController');

  // sensor Routes
  app.route('/person')
  	.post(productList.there_is_someone);

  // productList Routes
  app.route('/products')
    .get(productList.list_all_products)
    .post(productList.create_a_product);

  app.route('/products/:productId')
    .get(productList.read_a_product)
    .put(productList.update_a_product)
    .delete(productList.delete_a_product);

};
