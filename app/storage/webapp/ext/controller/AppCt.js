sap.ui.define(
  [
    "sap/ui/base/ManagedObject",
    "packagehandling/app/storage/ext/component/CStorageDlg",
  ],
  function (ManagedObject, CStorageDlg) {
    "use strict";

    function _loadCStorageDlg(oExtensionAPI) {
      new CStorageDlg(oExtensionAPI).load();
    }

    return {
      showCStorageDlg: function (oBindingContext, aSelectedContexts) {
        _loadCStorageDlg(this);
      },
    };
  }
);
