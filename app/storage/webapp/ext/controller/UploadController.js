sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "packagehandling/app/storage/ext/UploadDialog",
  ],
  function (Controller, UploadDialog) {
    "use strict";

    function _createUploadController(oExtensionAPI) {
      console.log(oExtensionAPI);

      return new UploadDialog(oExtensionAPI);
    }
    return {
      showUploadDialog: function (oBindingContext, aSelectedContexts) {
        this.loadFragment({
          id: "uploadDialog",
          name: "packagehandling.app.storage.ext.UploadDialog",
          controller: _createUploadController(this),
        }).then(function (oDialog) {
          oDialog.open();
        });
      },
    };
  }
);