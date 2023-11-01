sap.ui.define(
  [
    "sap/ui/base/ManagedObject",
    "packagehandling/app/storage/ext/component/CStorageDlg",
    "packagehandling/app/storage/ext/component/UStorageDlg",
  ],
  function (ManagedObject, CStorageDlg, UStorageDlg) {
    "use strict";

    function _loadCStorageDlg(oExtensionAPI) {
      new CStorageDlg(oExtensionAPI).load();
    }

    function _loadUStorageDlg(oExtensionAPI, aSelectedContexts) {
      new UStorageDlg(oExtensionAPI, aSelectedContexts).load();
    }

    return {
      showCStorageDlg: function (oBindingContext, aSelectedContexts) {
        _loadCStorageDlg(this);
      },

      showUStorageDlg: function (oBindingContext, aSelectedContexts) {
        _loadUStorageDlg(this, aSelectedContexts);
      },
    };
  }
);
