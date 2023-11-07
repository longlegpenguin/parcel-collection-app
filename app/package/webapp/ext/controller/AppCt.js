sap.ui.define(["sap/ui/base/ManagedObject"], function (ManagedObject) {
  "use strict";

  function _loadConfirmDlg(oExtensionAPI) {
    // new CStorageDlg(oExtensionAPI).load();
    console.log("Confirm");
  }

  function _loadPickUpDlg(oExtensionAPI) {
    // new CStorageDlg(oExtensionAPI).load();
    console.log("Pickup");
  }

  function _loadEditDlg(oExtensionAPI) {
    // new CStorageDlg(oExtensionAPI).load();
    console.log("Edit");
  }

  return {
    showConfirmDlg: function (oBindingContext, aSelectedContexts) {
      _loadConfirmDlg(this);
    },
    showPickUpDlg: function (oBindingContext, aSelectedContexts) {
      _loadPickUpDlg(this);
    },

    showEditDlg: function (oBindingContext, aSelectedContexts) {
      _loadEditDlg(this);
    },
  };
});
