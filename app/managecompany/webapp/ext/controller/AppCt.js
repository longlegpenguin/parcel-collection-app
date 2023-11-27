sap.ui.define(
  ["sap/ui/base/ManagedObject",
    "com/sap/internal/digitallab/packagehandling/app/manage/companies/ext/component/CCompanyDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/companies/ext/component/ECompanyDlg",
  ],
  function (ManagedObject, CCompanyDlg, ECompanyDlg) {
    "use strict";

    /**
     * Loads the create company dialog
     * @param {Object} oExtensionAPI 
     */
    function _loadCCompanyDlg(oExtensionAPI) {
      new CCompanyDlg(oExtensionAPI).load();
    }

    /**
     * Loads the edit company dialog
     * @param {Object} oExtensionAPI 
     * @param {Array} aSelectedContexts 
     */
    function _loadECompanyDlg(oExtensionAPI, aSelectedContexts) {
      new ECompanyDlg(oExtensionAPI, aSelectedContexts).load();
    }

    return {
      /**
       * Displays the create company dialog
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       */
      showCCompanyDlg: function (oBindingContext, aSelectedContexts) {
        _loadCCompanyDlg(this);
      },

      /**
       * Displays the edit company dialog
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       */
      showECompanyDlg: function (oBindingContext, aSelectedContexts) {
        _loadECompanyDlg(this, aSelectedContexts);
      },
    };
  }
);
