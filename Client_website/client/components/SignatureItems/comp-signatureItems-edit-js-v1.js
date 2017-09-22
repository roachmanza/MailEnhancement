function SignatureItemsEditViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    var currentId;

    self.ApiBaseUri = ko.observable();

    self.SignatureItemsHasError = ko.observable(false);
    self.SignatureItemsError = ko.observable();

    self.SignatureItemsLoading = ko.observable(false);
    self.SignatureItemsList = ko.observableArray([]);

    self.apiUrl = {
        getAllSignatureItemsById: "api/v1/SignatureItems",
        getAllContactTypes : "api/v1/ContactTypes",        
        getAllFieldTypes : "api/v1/FieldTypes",
        getAllLanguages: "api/v1/Languages",
        getAllCsiContactCategories : "api/v1/CsiContactCategories",
        getAllCsiContactTypes : "api/v1/CsiContactTypes",
        updateSignatureItemsById: "api/v1/SignatureItems",
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model, itemId) {
        currentId = itemId;
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenSignatureItemsList = function () {
        window.location.replace("../SignatureItems/list");
    };

    self.OpenSignatureItems = function () {
        window.location.replace("../SignatureItems/view?id=" + currentId);
    };

    self.SaveSignatureItems = function () {
        self.SignatureItemsHasError(false);
        self.SignatureItemsError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.contacttypes()) {
            self.SignatureItemsHasError(true);
            self.SignatureItemsError("Please select a contact type");
            return;
        };
        var jsonObject = JSON.stringify({
            contactTypeId: self.contacttypes().contacttypeid + '',
            fieldTypeId: self.fieldtypes().fieldtypeid + '',
            languageId: self.languages().languageid + '',
            csiContactCategoryId: self.csiContactCategories().csicontactcategoryid + '',
            csiContactTypeId: self.csiContactTypes().csicontacttypeid + '',
            csiMainContactTypeId: self.csiMainContactTypes().csicontacttypeid + '',
            sequence: self.sequence() + '',
            label: self.label(),
            value: self.value(),
            printFormat: self.printformat(),
            inActive: inactive
        });
        console.log(jsonObject)
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.updateSignatureItemsById + "/" + currentId;
        ajaxAsync.ajaxPut(self, self._SaveSignatureItems, url, null, jsonObject, null, headers);
    };
    self._SaveSignatureItems = function (result) {
        if (result.success) {
            self.OpenSignatureItems();
        } else {
            self.SignatureItemsHasError(true);
            self.SignatureItemsError(result.errorMessage);
        }
    };



    self.GetSignatureItemById = function () {
        self.SignatureItemsLoading(true);
        self.SignatureItemsList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllSignatureItemsById+ "/" + currentId;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateSignatureItemsItem, url, null, null, null, headers);
    };

    self.signatureitemid = ko.observable("");
    self.contacttypeid = ko.observable("");
    self.fieldtypeid = ko.observable("");
    self.languageid = ko.observable("");
    self.csicontactcategoryid = ko.observable("");
    self.csicontacttypeid = ko.observable("");
    self.csimaincontacttypeid = ko.observable("");
    self.sequence = ko.observable("");
    self.label = ko.observable("");
    self.value = ko.observable("");
    self.printformat = ko.observable("");
    self.inactivedate = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self._populateSignatureItemsItem = function (result) {
        if (result.success) {
            if (result.success) {
                var data = result.data.data;
                self.signatureitemid(data[0].signatureitemid);
                self.contacttypeid(data[0].contacttypeid);
                self.fieldtypeid(data[0].fieldtypeid);
                self.languageid(data[0].languageid);
                self.csicontactcategoryid(data[0].csicontactcategoryid);
                self.csicontacttypeid(data[0].csicontacttypeid);
                self.csimaincontacttypeid(data[0].csimaincontacttypeid);
                self.sequence(data[0].sequence);
                self.label(data[0].label);
                self.value(data[0].value);
                self.printformat(data[0].printformat);
                self.inactivedate(data[0].inactivedate);
                self.inactive(data[0].inactive);
                self.inactivechecked(self.getInActive(data[0].inactive)); 
                //dropdown values
                self.contacttypes(self.getContactTypesItem(data[0].contacttypeid));  
                self.fieldtypes(self.getFieldTypesItem(data[0].fieldtypeid));  
                self.languages(self.getLanguagesItem(data[0].languageid));  
                self.csiContactCategories(self.getCsiContactCategories(data[0].csicontactcategoryid));                 
                self.csiContactTypes(self.getCsiContactTypes(data[0].csicontacttypeid));                 
                self.csiMainContactTypes(self.getCsiMainContactTypes(data[0].csimaincontacttypeid)); 
            }
        } else {
             if(result.errorMessage==="error"){
                self.SignatureItemsHasError(true);
                self.SignatureItemsError("");
            }else{
                self.SignatureItemsHasError(true);
                self.SignatureItemsError(result.errorMessage);
            }
        }
        self.SignatureItemsLoading(false);
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
    
    //Get the FieldTypes dropdown
    self.availableFieldTypes = ko.observableArray([{name : 'NONE AVAILABLE'}]);
    self.fieldtypes = ko.observable("");
    self.GetFieldTypes = function () {
        self.availableFieldTypes.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getAllFieldTypes;
        ajaxAsync.ajaxGet(self, self._GetFieldTypes, url, null, null, null, headers);
    };
    self._GetFieldTypes = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                dataItem.testvalue = data[i].Name+" "+data[i].Name
                self.availableFieldTypes.push(dataItem);
            }
        }
    };
    self.getFieldTypesItem = function (id) {
        for (var i = 0; i < self.availableFieldTypes().length; i++) {
            var curId = self.availableFieldTypes()[i].fieldtypeid
            if ( curId === id) {
                console.log(self.availableFieldTypes()[i]);
                return self.availableFieldTypes()[i];
            }
        }
    };

    
    //Get the Languages dropdown
    self.availableLanguages = ko.observableArray([{name : 'NONE AVAILABLE'}]);
    self.languages = ko.observable("");
    self.GetLanguages = function () {
        self.availableLanguages.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getAllLanguages;
        ajaxAsync.ajaxGet(self, self._GetLanguages, url, null, null, null, headers);
    };
    self._GetLanguages = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                dataItem.testvalue = data[i].Name+" "+data[i].Name
                self.availableLanguages.push(dataItem);
            }
        }
    };
    self.getLanguagesItem = function (id) {
        for (var i = 0; i < self.availableLanguages().length; i++) {
            var curId = self.availableLanguages()[i].languageid
            if ( curId === id) {
                console.log(self.availableLanguages()[i]);
                return self.availableLanguages()[i];
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

    
    //Get the CsiContactTypes dropdown
    self.availableCsiContactTypes = ko.observableArray([{name : 'NONE AVAILABLE'}]);
    self.csiContactTypes = ko.observable("");
    self.GetCsiContactTypes = function () {
        self.availableCsiContactTypes.removeAll();
        self.availableCsiMainContactTypes.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getAllCsiContactTypes;
        ajaxAsync.ajaxGet(self, self._GetCsiContactTypes, url, null, null, null, headers);
    };
    self._GetCsiContactTypes = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                dataItem.testvalue = data[i].Name+" "+data[i].Name
                self.availableCsiContactTypes.push(dataItem);
                self.availableCsiMainContactTypes.push(dataItem);
            }
        }
    };
    self.getCsiContactTypes = function (id) {
        for (var i = 0; i < self.availableCsiContactTypes().length; i++) {
            var curId = self.availableCsiContactTypes()[i].csicontacttypeid
            if ( curId === id) {
                console.log(self.availableCsiContactTypes()[i]);
                return self.availableCsiContactTypes()[i];
            }
        }
    };



    //Get the CsiMainContactTypes dropdown
    self.availableCsiMainContactTypes = ko.observableArray([{name : 'NONE AVAILABLE'}]);
    self.csiMainContactTypes = ko.observable("");    
    self.getCsiMainContactTypes = function (id) {
        for (var i = 0; i < self.availableCsiMainContactTypes().length; i++) {
            var curId = self.availableCsiMainContactTypes()[i].csicontacttypeid
            if ( curId === id) {
                console.log(self.availableCsiMainContactTypes()[i]);
                return self.availableCsiMainContactTypes()[i];
            }
        }
    };

}
