/*
 * [records] NodeJS Routes
 * @author Thais Watanabe
 */
 'use strict';

 module.exports = function(app, io) {
 	var recordController = require('../controllers/appController');

  // sensor Routes
  app.route('/person')
  .post(recordController.there_is_someone);

  app.route('/whichRecord')
  .get(recordController.which_record);

  // productList Routes
  app.route('/manageRecords')
  .get(recordController.list_all_records)
  .post(recordController.create_a_record);

  app.route('/manageRecords/:recordId')
  .get(recordController.read_a_record)
  .put(recordController.update_a_record)
  .delete(recordController.delete_a_record);

  app.route('/records/')
  .get(recordController.clear_selected_record);

  app.route('/records/:recordId')
  .get(recordController.select_the_record);

};