sap.ui.define(
  [
    "sap/ui/base/ManagedObject",
    "com/sap/internal/digitallab/packagehandling/app/manage/storages/ext/component/CStorageDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/storages/ext/component/UStorageDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/storages/ext/component/CSlotDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/storages/ext/component/USlotDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/storages/ext/component/MassCreateDlg",
  ],
  function (
    ManagedObject,
    CStorageDlg,
    UStorageDlg,
    CSlotDlg,
    USlotDlg,
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

    function _loadUSlotDlg(oExtensionAPI, aSelectedContexts) {
      new USlotDlg(oExtensionAPI, aSelectedContexts).load();
    }

    function _loadMassCreateDlg(oExtensionAPI, aSelectedContexts) {
      new MassCreateDlg(oExtensionAPI, aSelectedContexts).load();
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

      showMassCreateDlg: function (oBindingContext, aSelectedContexts) {
        console.log(oBindingContext);
        _loadMassCreateDlg(this, oBindingContext);
      },
    };
  }
);
