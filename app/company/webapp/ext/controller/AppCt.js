sap.ui.define(
  ["sap/ui/base/ManagedObject", "ph/app/company/ext/component/CCompanyDlg"],
  function (ManagedObject, CCompanyDlg) {
    "use strict";

    function _loadCCompanyDlg(oExtensionAPI) {
      new CCompanyDlg(oExtensionAPI).load();
    }

    return {
      showCCompanyDlg: function (oBindingContext, aSelectedContexts) {
        _loadCCompanyDlg(this);
      },
    };
  }
);
