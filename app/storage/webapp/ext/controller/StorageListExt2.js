sap.ui.define([
    "packagehandling/app/storage/ext/handler/CreateStorageDialog",
    ],
    function (CreateStorageDialog){
        "use strict";
        let createStorage;
        return {
            onInit: function() {
                createStorage = new CreateStorageDialog(this);
                this.getView().getController().getOwnerComponent().getRouter("ListReport")
                     .attachRoutePatternMatched(this._onRouteMatched, this);
            },
            /**
            * @description : Open the create baseline dialog.
            * @param {Object} oEvent
            */
            onPressCreateStorageAction : function(oEvent){
                let createStorage = new CreateStorageDialog(this);
                createStorage.open();
            }
        };
    });
    