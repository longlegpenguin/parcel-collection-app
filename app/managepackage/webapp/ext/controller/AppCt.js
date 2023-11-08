sap.ui.define(
  [
    "sap/ui/base/ManagedObject",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "com/sap/internal/digitallab/packagehandling/app/manage/package/ext/component/ConfirmDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/package/ext/component/EditDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/package/ext/component/PkMBox",
  ],
  function (
    ManagedObject,
    MessageBox,
    MessageToast,
    ConfirmDlg,
    EditDlg,
    PkMBox
  ) {
    "use strict";

    function _loadConfirmDlg(oExtensionAPI, aSelectedContexts) {
      new ConfirmDlg(oExtensionAPI, aSelectedContexts).load();
      console.log("Confirm");
    }

    function _loadPickUpDlg(oExtensionAPI, oBindingContext, aSelectedContexts) {
      new PkMBox(oExtensionAPI).onPickUpPress(
        oBindingContext,
        aSelectedContexts
      );
      console.log("Pickup");
    }

    function _loadEditDlg(oExtensionAPI, aSelectedContexts) {
      new EditDlg(oExtensionAPI, aSelectedContexts).load();
      console.log("Edit");
    }

    return {
      showConfirmDlg: function (oBindingContext, aSelectedContexts) {
        console.log("Selected context: " + aSelectedContexts);
        if (aSelectedContexts == undefined || aSelectedContexts.length == 0) {
          MessageBox.warning("Please select at least one package to confirm.");
        } else {
          _loadConfirmDlg(this, aSelectedContexts);
        }
      },
      
      showPickUpMBox: function (oBindingContext, aSelectedContexts) {
        if (aSelectedContexts == undefined || aSelectedContexts.length !== 1) {
          MessageBox.warning("Please select exactly one package to pickup.");
        } else {
          _loadPickUpDlg(this, oBindingContext, aSelectedContexts);
        }
      },

      showEditDlg: function (oBindingContext, aSelectedContexts) {
        _loadEditDlg(this, aSelectedContexts);
      },
    };
  }
);
