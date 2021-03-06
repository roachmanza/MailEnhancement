'use strict';
module.exports = function(webserver) {
    var controller = require('../controllers/LanguagesController');
    webserver.route('/MailEnhancement/api/v1/Languages')
        .post(controller.create_a_Language)
        .get(controller.read_all_Languages);
    webserver.route('/MailEnhancement/api/v1/Languages/:id')
        .get(controller.read_a_Language)
        .put(controller.update_a_Language)
        .delete(controller.delete_a_Language);
};