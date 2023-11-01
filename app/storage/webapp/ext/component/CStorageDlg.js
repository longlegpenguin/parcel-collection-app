sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend(
      "packagehandling.app.storage.ext.component.CStorageDlg",
      {
        constructor: function (oExtensionAPI) {
          this._oExtensionAPI = oExtensionAPI;
        },

        load: function () {
          this._oExtensionAPI
            .loadFragment({
              id: "csdlg",
              name: "packagehandling.app.storage.ext.view.CStorageDlg",
              controller: this,
            })
            .then(function (oDialog) {
              oDialog.open();
            });
        },

        onDialogBeforeOpen: function (oEvent) {
          console.log("onBeforeOpen");
          this._oCStorageDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oCStorageDlg);
        },

        onDialogAfterClose: function (oEvent) {
          console.log("onAfterClose");
          this._oExtensionAPI.removeDependent(this._oCStorageDlg);
          this._oCStorageDlg.destroy();
          this._oCStorageDlg = undefined;
        },

        onCreateButtonPress: function (oEvent) {
          var postData = this._getInputs();
          var oModel = this._oExtensionAPI.getModel("MyModel");

          var fnSuccess = function () {
            this._setBusy(false);
            this._closeDialog();
            MessageToast.show("Created!");
          }.bind(this);

          var fnError = function (oError) {
            this._setBusy(false);
            var msg = this._getErrorMsg(oError);
            MessageBox.error(msg);
          }.bind(this);

          var oContext = oModel.createEntry("/Storage", {
            properties: postData,
            success: fnSuccess,
            error: fnError,
          });

          oModel.submitChanges({
            success: function () {},
            error: function () {},
          });
          oContext.delete();
        },

        onCloseButtonPress: function (oEvent) {
          console.log("close cliacked");
          this._closeDialog();
        },

        _getInputs: function () {
          var name = this._byId("idNameInput").getValue();
          var bf = this._byId("idBfInput").getValue();
          var map = this._byId("idMapInput").getValue();
          var locIns = this._byId("idTextLocInsInput").getValue();

          return {
            name: name,
            buildingFloor: bf,
            map: map,
            locationInstructions: locIns,
          };
        },

        _getErrorMsg(oError) {
          return JSON.parse(oError.responseText).error.message.value;
        },

        _setOkButtonEnabled: function (bOk) {
          this._oCStorageDlg &&
            this._oCStorageDlg.getBeginButton().setEnabled(bOk);
        },

        _setBusy: function (bBusy) {
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
