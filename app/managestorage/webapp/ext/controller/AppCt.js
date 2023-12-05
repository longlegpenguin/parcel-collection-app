sap.ui.define(
  [
    "com/sap/internal/digitallab/packagehandling/app/manage/storages/ext/component/CStorageDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/storages/ext/component/UStorageDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/storages/ext/component/CSlotDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/storages/ext/component/MassCreateDlg",
  ],
  function (
    CStorageDlg,
    UStorageDlg,
    CSlotDlg,
    MassCreateDlg
  ) {
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

    function _loadMassCreateDlg(oExtensionAPI, aSelectedContexts) {
      new MassCreateDlg(oExtensionAPI, aSelectedContexts).load();
    }

    return {
      /**
       * Displays the create storage dialog
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       */
      showCStorageDlg: function (oBindingContext, aSelectedContexts) {
        _loadCStorageDlg(this);
      },

      /**
       * Displays the edit storage dialog
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       */
      showUStorageDlg: function (oBindingContext, aSelectedContexts) {
        _loadUStorageDlg(this, aSelectedContexts);
      },

      /**
       * Displays the create slot dialog
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       */
      showCSlotDlg: function (oBindingContext, aSelectedContexts) {
        _loadCStlotDlg(this, oBindingContext);
      },

      /**
       * Displays the mass create slots dialog
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       */
      showMassCreateDlg: function (oBindingContext, aSelectedContexts) {
        _loadMassCreateDlg(this, oBindingContext);
      },
    };
  }
);
