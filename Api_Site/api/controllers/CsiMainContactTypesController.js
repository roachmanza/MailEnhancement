
exports.get_all_CsiMainContactTypes = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet(        
        'SELECT '+
        ' CMCT."CsiMainContactTypeId" as CsiMainContactTypeId,'+
        ' CMCT."Name" as Name,'+
        ' CMCT."Description" as Description,'+
        ' CMCT."InActiveDate" as InActiveDate,'+
        ' CMCT."InActive" as InActive'+   
        ' FROM public."CsiMainContactTypes" AS CMCT',
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({success: false,  httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.create_a_CsiMainContactType = function (req, res) {
    var dataGet = require('../dataAccess/dataGet');
    dataGet('SELECT "CsiMainContactTypeId" FROM public."CsiMainContactTypes" order by "CsiMainContactTypeId" desc LIMIT 1',
        function (numberResults) {
            var id = 1;
            if (numberResults[0] != null) {
                id = numberResults[0]["CsiMainContactTypeId"] + 1;
            }
            var name = req.body.name;
            var description = req.body.description;
            var inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
            var inactive = 0;
            var dataPost = require('../dataAccess/dataPost');
            dataPost('INSERT INTO public."CsiMainContactTypes"("CsiMainContactTypeId", "Name", "Description", "InActiveDate", "InActive") ' +
                'VALUES' +
                '(' + id + ',\'' + name + '\' ,\'' + description + '\' ,\'' + inactiveDate + '\' ,\'' + inactive + '\')',
                function (results, err) {
                    if (err) {
                        res.status(400).type('application/json').json({success: false,  httpStatusCode: 400, error: { status: "Bad Request", message: results } });
                    } else {
                        res.status(201).type('application/json').json({ success: true, httpStatusCode: 201, status: "Created", data: results });
                    }
                });
        });
};

exports.read_a_CsiMainContactType = function (req, res) {
    var id = req.params.Id;
    var dataGet = require('../dataAccess/dataGet');
    dataGet(
        'SELECT '+
        ' CMCT."CsiMainContactTypeId" as CsiMainContactTypeId,'+
        ' CMCT."Name" as Name,'+
        ' CMCT."Description" as Description,'+
        ' CMCT."InActiveDate" as InActiveDate,'+
        ' CMCT."InActive" as InActive'+   
        ' FROM public."CsiMainContactTypes" AS CMCT'+        
        ' WHERE CMCT."CsiMainContactTypeId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({success: true,  httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.update_a_CsiMainContactType = function (req, res) {
    var id = req.params.Id;
    var name = req.body.name;
    var description = req.body.description;
    var inactiveDate;
    var inactive;
    if (req.body.inActive === "1") {
        inactive = 1;
        inactiveDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    } else {
        inactive = 0;
        inactiveDate = new Date(1900, 01, 01).toJSON().slice(0, 10).replace(/-/g, '/');
    }


    var dataPut = require('../dataAccess/dataPut');
    dataPut(' UPDATE public."CsiMainContactTypes" ' +
        'SET ' +
        ' "Name"=\'' + name + '\', ' +
        ' "Description"=\'' + description + '\', ' +
        ' "InActiveDate"=\'' + inactiveDate + '\', ' +
        ' "InActive"=\'' + inactive + '\' ' +
        'where "CsiMainContactTypeId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({success: true,  httpStatusCode: 200, status: "OK", data: results });
            }
        });
};

exports.delete_a_CsiMainContactType = function (req, res) {
    var id = req.params.Id;
    var dataDelete = require('../dataAccess/dataDelete');
    dataDelete('DELETE FROM public."CsiMainContactTypes" where "CsiMainContactTypeId" = ' + id,
        function (results, err) {
            if (err) {
                res.status(400).type('application/json').json({ success: false, httpStatusCode: 400, error: { status: "Bad Request", message: results } });
            } else {
                res.status(200).type('application/json').json({ success: true, httpStatusCode: 200, status: "No Content", data: results });
            }
        });
};
