sap.ui.define(
  [
    "sap/ui/base/ManagedObject",
    "packagehandling/app/storage/ext/component/CStorageDlg",
    "packagehandling/app/storage/ext/component/UStorageDlg",
    "packagehandling/app/storage/ext/component/CSlotDlg",
    "packagehandling/app/storage/ext/component/USlotDlg",
  ],
  function (ManagedObject, CStorageDlg, UStorageDlg, CSlotDlg, USlotDlg) {
    "use strict";

    function _loadCStorageDlg(oExtensionAPI) {
      new CStorageDlg(oExtensionAPI).load();
    }

    function _loadCStlotDlg(oExtensionAPI, aSelectedContexts) {
      new CSlotDlg(oExtensionAPI, aSelectedContexts).load();
    }

    function _loadUStorageDlg(oExtensionAPI, aSelectedContexts) {
      new UStorageDlg(oExtensionAPI, aSelectedContexts).load();
    }

    function _loadUSlotDlg(oExtensionAPI, aSelectedContexts) {
      new USlotDlg(oExtensionAPI, aSelectedContexts).load();
    }

    return {
      showCStorageDlg: function (oBindingContext, aSelectedContexts) {
        _loadCStorageDlg(this);
      },

      showUStorageDlg: function (oBindingContext, aSelectedContexts) {
        _loadUStorageDlg(this, aSelectedContexts);
      },

      showCSlotDlg: function (oBindingContext, aSelectedContexts) {
        console.log(oBindingContext);
        _loadCStlotDlg(this, oBindingContext);
      },

      showUSlotDlg: function (oBindingContext, aSelectedContexts) {
        console.log(oBindingContext);
        _loadUSlotDlg(this, oBindingContext);
      },
    };
  }
);
