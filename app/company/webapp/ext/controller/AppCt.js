sap.ui.define(
  ["sap/ui/base/ManagedObject", 
  "ph/app/company/ext/component/CCompanyDlg",
  "ph/app/company/ext/component/ECompanyDlg",
],
  function (ManagedObject, CCompanyDlg, ECompanyDlg) {
    "use strict";

    function _loadCCompanyDlg(oExtensionAPI) {
      new CCompanyDlg(oExtensionAPI).load();
    }

    function _loadECompanyDlg(oExtensionAPI, aSelectedContexts) {
      new ECompanyDlg(oExtensionAPI, aSelectedContexts).load();
    }

    return {
      showCCompanyDlg: function (oBindingContext, aSelectedContexts) {
        _loadCCompanyDlg(this);
      },

      showECompanyDlg: function (oBindingContext, aSelectedContexts) {
        _loadECompanyDlg(this, aSelectedContexts);
      },
    };
  }
);
