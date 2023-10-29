sap.ui.define(
  [
    "packagehandling/app/storage/ext/handler/CreateStorageDialog",
    "sap/ui/core/mvc/Controller",
  ],
  function (CreateStorageDialog, Controller) {
    "use strict";
    let createStorage;
    return Controller.extend("packagehandling.app.storage.ext.controller.StorageListExt", {
      onInit: function () {
        createStorage = new CreateStorageDialog(this);
        this.getView()
          .getController()
          .getOwnerComponent()
          .getRouter("ListReport")
          .attachRoutePatternMatched(this._onRouteMatched, this);
      },
      /**
       * @description : Open the create baseline dialog.
       * @param {Object} oEvent
       */
      onPressCreateStorageAction: function (oEvent) {
        createStorage.open();
      },
    });
  }
);
