function FieldItemsCreateViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;

    self.ApiBaseUri = ko.observable();

    self.FieldItemsHasError = ko.observable(false);
    self.FieldItemsError = ko.observable();

    self.FieldItemsLoading = ko.observable(false);
    self.FieldItemsList = ko.observableArray([]);

    self.apiUrl = {
        getFieldItemsById: "api/v1/FieldItems",
        createFieldItems: "api/v1/FieldItems",
        getAllContactTypes : "api/v1/ContactTypes",        
        getAllCsiContactCategories : "api/v1/CsiContactCategories"
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenFieldItemsList = function () {
        window.location.replace("../FieldItems/list");
    };

    self.csicontactcategorymappingid = ko.observable("");
    self.csicontactcategoryid = ko.observable("");
    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self.SaveFieldItems = function () {
        self.FieldItemsHasError(false);
        self.FieldItemsError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.contacttypes()) {
            self.FieldItemsHasError(true);
            self.FieldItemsError("Please supply a contact type");
            return;
        };
        if (!self.csiContactCategories()) {
            self.FieldItemsHasError(true);
            self.FieldItemsError("Please supply a contact category");
            return;
        };
        if (!self.name()) {
            self.FieldItemsHasError(true);
            self.FieldItemsError("Please supply a name");
            return;
        };
        if (!self.description()) {
            self.FieldItemsHasError(true);
            self.FieldItemsError("Please supply a description");
            return;
        };
        var jsonObject = JSON.stringify({
            csiContactCategoryId : self.csiContactCategories().csicontactcategoryid + '',
            contactTypeId: self.contacttypes().contacttypeid + '',
            name: self.name(),
            description: self.description(),
            inActive: inactive
        });
        console.log(jsonObject)
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.createFieldItems;
        ajaxAsync.ajaxPost(self, self._SaveFieldItems, url, null, jsonObject, null, headers);
    };
    self._SaveFieldItems = function (result) {
        if (result.success) {
            self.OpenFieldItemsList();
        } else {
            self.FieldItemsHasError(true);
            self.FieldItemsError(result.errorMessage);
        }
    };
    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

    //Get the ContactTypes dropdown
    self.availableContactTypes = ko.observableArray([{name : 'NONE AVAILABLE'}]);
    self.contacttypes = ko.observable("");
    self.GetContactTypes = function () {
        self.availableContactTypes.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getAllContactTypes;
        ajaxAsync.ajaxGet(self, self._GetContactTypes, url, null, null, null, headers);
    };
    self._GetContactTypes = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                dataItem.testvalue = data[i].Name+" "+data[i].Name
                self.availableContactTypes.push(dataItem);
            }
        }
    };
    self.getContactTypesItem = function (id) {
        for (var i = 0; i < self.availableContactTypes().length; i++) {
            var curId = self.availableContactTypes()[i].contacttypeid
            if ( curId === id) {
                console.log(self.availableContactTypes()[i]);
                return self.availableContactTypes()[i];
            }
        }
    };
           
    //Get the CsiContactCategories dropdown
    self.availableCsiContactCategories = ko.observableArray([{name : 'NONE AVAILABLE'}]);
    self.csiContactCategories = ko.observable("");
    self.GetCsiContactCategories = function () {
        self.availableCsiContactCategories.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getAllCsiContactCategories;
        ajaxAsync.ajaxGet(self, self._GetCsiContactCategories, url, null, null, null, headers);
    };
    self._GetCsiContactCategories = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                dataItem.testvalue = data[i].Name+" "+data[i].Name
                self.availableCsiContactCategories.push(dataItem);
            }
        }
    };
    self.getCsiContactCategories = function (id) {
        for (var i = 0; i < self.availableCsiContactCategories().length; i++) {
            var curId = self.availableCsiContactCategories()[i].csicontactcategoryid
            if ( curId === id) {
                console.log(self.availableCsiContactCategories()[i]);
                return self.availableCsiContactCategories()[i];
            }
        }
    };


}