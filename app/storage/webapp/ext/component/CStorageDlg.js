sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/base/ManagedObject",
  ],
  function (Controller, MessageBox, ManagedObject) {
    "use strict";
    console.log("fff");
    return Controller.extend(
      "packagehandling.app.storage.ext.component.CStorageDlg",
      {
        constructor: function (oExtensionAPI) {
          this._oExtensionAPI = oExtensionAPI;
        },

        onBeforeOpen: function (oEvent) {
          console.log("oh huhuhu");
          this._oCStorageDlg = oEvent.getSource();
          console.log(this._oCStorageDlg);
          this._oExtensionAPI.addDependent(this._oCStorageDlg);
        },

        onAfterClose: function (oEvent) {
          console.log("onAfterClose");
          this._oExtensionAPI.removeDependent(this._oCStorageDlg);
          this._oCStorageDlg.destroy();
          this._oCStorageDlg = undefined;
        },
        onFuck: function (oEvent) {
          console.log("Fuck");
        },

        onOk: function (oEvent) {
          console.log("ok cliacked");
          // this._setDialogBusy(true);
          MessageBox.error("Not implemented");
        },

        onCancel: function (oEvent) {
          console.log("close cliacked");
          this._closeDialog();
        },

        _setOkButtonEnabled: function (bOk) {
          this._oCStorageDlg &&
            this._oCStorageDlg.getBeginButton().setEnabled(bOk);
        },

        _setDialogBusy: function (bBusy) {
          this._oCStorageDlg.setBusy(bBusy);
        },

        _closeDialog: function () {
          this._oCStorageDlg && this._oCStorageDlg.close();
        },

        _showError: function (sMessage) {
          MessageBox.error(sMessage || "Upload failed");
        },

        // TODO: Better option for this?
        _byId: function (sId) {
          return sap.ui.core.Fragment.byId("csdlg", sId);
        },
      }
    );
  }
);
