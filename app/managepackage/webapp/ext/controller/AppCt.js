sap.ui.define(
  [
    "sap/ui/base/ManagedObject",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "com/sap/internal/digitallab/packagehandling/app/manage/package/ext/component/ConfirmDlg",
  ],
  function (ManagedObject, MessageBox, MessageToast, ConfirmDlg) {
    "use strict";

    function _loadConfirmDlg(oExtensionAPI, aSelectedContexts) {
      new ConfirmDlg(oExtensionAPI, aSelectedContexts).load();
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
        console.log("Selected context: " +aSelectedContexts);
        if (aSelectedContexts == undefined || aSelectedContexts.length == 0) {
          MessageBox.warning("Please select at least one package to confirm.");
        } else {
          _loadConfirmDlg(this, aSelectedContexts);
        }
      },
      showPickUpDlg: function (oBindingContext, aSelectedContexts) {
        _loadPickUpDlg(this);
      },

      showEditDlg: function (oBindingContext, aSelectedContexts) {
        _loadEditDlg(this);
      },
    };
  }
);
