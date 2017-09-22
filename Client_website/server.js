var express = require('express');
var webserver = express();
var port = process.env.PORT || 4011;
var bodyParser = require('body-parser');
var path = require('path');



//PARSER
webserver.use(bodyParser.urlencoded({ extended: true }));
webserver.use(bodyParser.json());

//client css
webserver.get('/client/content/css/default', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/css/client.css')); });
webserver.get('/client/content/img/favicon', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/img/MailIcon24.png')); });
webserver.get('/client/content/img/config', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/img/ConfigIcon64.png')); });

//client js
webserver.get('/client/content/js/default', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/js/client.js')); });
webserver.get('/client/content/js/bootstrap', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/js/bootstrap.min.js')); });
webserver.get('/client/content/js/webcomponentslite', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/js/webcomponents-lite.js')); });
webserver.get('/client/content/js/appframework', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/js/appFrameWork.js')); });
webserver.get('/client/content/js/polymer', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/js/polymer/polymer.html')); });
webserver.get('/client/content/js/polymer-mini', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/js/polymer/polymer-mini.html')); });
webserver.get('/client/content/js/polymer-micro', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/js/polymer/polymer-micro.html')); });

// static folders to be able to point to css, js etc files in a directory
webserver.get('/', function (req, res) { res.sendFile(path.join(__dirname + '/client/index.html')); });
webserver.get('/home/', function (req, res) { res.sendFile(path.join(__dirname + '/client/index.html')); });
webserver.get('/AwdContactTypeMappings', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/AwdContactTypeMappings/list.html')); });
webserver.get('/ContactTypes', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/ContactTypes/list.html')); });
webserver.get('/CsiContactCategories', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategories.html')); });
webserver.get('/CsiContactTypes', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypes.html')); });
webserver.get('/FieldTypes', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/FieldTypes.html')); });
webserver.get('/Languages', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/Languages.html')); });
webserver.get('/SignatureItems', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/SignatureItems.html')); });
webserver.get('/Signatures', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/Signatures.html')); });

//AwdContactTypeMappings PATHS
//============================
webserver.get('/AwdContactTypeMappings/List', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/AwdContactTypeMappings/list.html')); });
webserver.get('/AwdContactTypeMappings/create', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/AwdContactTypeMappings/create.html')); });
webserver.get('/AwdContactTypeMappings/edit', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/AwdContactTypeMappings/edit.html')); });
webserver.get('/AwdContactTypeMappings/view', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/AwdContactTypeMappings/view.html')); });
//AwdContactTypeMappings component PATHS
//list
webserver.get('/comp-awdContactTypeMappings-list', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-list.html')); });
webserver.get('/comp-awdContactTypeMappings-list/js', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-list-js-v1.js')); });
//create
webserver.get('/comp-awdContactTypeMappings-create', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-create.html')); });
webserver.get('/comp-awdContactTypeMappings-create/js', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-create-js-v1.js')); });
//edit
webserver.get('/comp-awdContactTypeMappings-edit', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-edit.html')); });
webserver.get('/comp-awdContactTypeMappings-edit/js', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-edit-js-v1.js')); });
//view
webserver.get('/comp-awdContactTypeMappings-view', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-view.html')); });
webserver.get('/comp-awdContactTypeMappings-view/js', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/AwdContactTypeMappings/comp-awdContactTypeMappings-view-js-v1.js')); });

//AwdContactTypeMappings PATHS
//============================
webserver.get('/ContactTypes/List', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/ContactTypes/list.html')); });
webserver.get('/ContactTypes/create', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/ContactTypes/create.html')); });
webserver.get('/ContactTypes/edit', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/ContactTypes/edit.html')); });
webserver.get('/ContactTypes/view', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/ContactTypes/view.html')); });
//AwdContactTypeMappings component PATHS
//list
webserver.get('/comp-contactTypes-list', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-list.html')); });
webserver.get('/comp-contactTypes-list/js', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-list-js-v1.js')); });
//create
webserver.get('/comp-contactTypes-create', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-create.html')); });
webserver.get('/comp-contactTypes-create/js', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-create-js-v1.js')); });
//edit
webserver.get('/comp-contactTypes-edit', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-edit.html')); });
webserver.get('/comp-contactTypes-edit/js', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-edit-js-v1.js')); });
//view
webserver.get('/comp-contactTypes-view', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-view.html')); });
webserver.get('/comp-contactTypes-view/js', function (req, res) { res.sendFile(path.join(__dirname + '/client/components/ContactTypes/comp-contactTypes-view-js-v1.js')); });

//Listen on port number
webserver.listen(port);
console.log('Mail enhancement site server started on: ' + port);