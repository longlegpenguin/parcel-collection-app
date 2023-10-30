sap.ui.define(
  [
    "packagehandling/app/storage/ext/component/CStorageDlg",
  ],
  function (CStorageDlg) {
    "use strict";

    function _createCStorageDlgController(oExtensionAPI) {
      console.log(oExtensionAPI);
      return new CStorageDlg(oExtensionAPI);
    }

    return {
      showCStorageDlg: function (oBindingContext, aSelectedContexts) {
        let ctl = _createCStorageDlgController(this)
        console.log(ctl);
        this.loadFragment({
          id: "csdlg",
          name: "packagehandling.app.storage.ext.view.CStorageDlg",
          controller: _createCStorageDlgController(this),
        }).then(function (oDialog) {
          oDialog.open();
        });
      },
    };
  }
);
