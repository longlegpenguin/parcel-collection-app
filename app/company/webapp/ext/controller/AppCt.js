sap.ui.define(
  ["sap/ui/base/ManagedObject", 
  "com/sap/internal/digitallab/packagehandling/app/manage/companies/ext/component/CCompanyDlg",
  "com/sap/internal/digitallab/packagehandling/app/manage/companies/ext/component/ECompanyDlg",
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
