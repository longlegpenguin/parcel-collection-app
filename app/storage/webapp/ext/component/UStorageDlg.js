sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend(
      "packagehandling.app.storage.ext.component.UStorageDlg",
      {
        constructor: function (oExtensionAPI, aSelectedContexts) {
          this._oExtensionAPI = oExtensionAPI;
          this._oSelectedContext = aSelectedContexts[0];
          console.log(this._oSelectedContext.sPath);
        },

        load: function () {
          this._oExtensionAPI
            .loadFragment({
              id: "usdlg",
              name: "packagehandling.app.storage.ext.view.UStorageDlg",
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

          var fnSuccess = function (oData) {
            var d = JSON.stringify(oData, null, 4);
            console.log(d);
            var byId = (sId) => sap.ui.core.Fragment.byId("usdlg", sId);
            var setInput = (sId, sValue) => byId(sId).setValue(sValue);
            setInput("idNameInput", oData.name);
            byId("idBuildingFloorSelect").setSelectedKey(oData.buildingFloor_ID);
            setInput("idMapInput", oData.map);
            setInput("idTextLocInsInput", oData.locationInstructions);
          };

          var oModel = this._oExtensionAPI.getModel("MyModel");
          oModel.read(this._getSelected(), {
            success: fnSuccess,
            error: function () {},
          });
        },

        onDialogAfterClose: function (oEvent) {
          console.log("onAfterClose");
          this._oExtensionAPI.removeDependent(this._oCStorageDlg);
          this._oCStorageDlg.destroy();
          this._oCStorageDlg = undefined;
          this._oExtensionAPI.refresh();
        },

        onSaveButtonPress: function (oEvent) {
          var oData = this._getInputs();
          var oModel = this._oExtensionAPI.getModel("MyModel");

          var fnSuccess = function () {
            this._setBusy(false);
            this._closeDialog();
            MessageToast.show("Updated!");
          }.bind(this);

          var fnError = function (oError) {
            this._setBusy(false);
            var msg = this._getErrorMsg(oError);
            MessageBox.error(msg);
          }.bind(this);

          oModel.update(this._getSelected(), oData, {
            success: fnSuccess,
            error: fnError,
          });
        },

        onCloseButtonPress: function (oEvent) {
          console.log("close cliacked");
          this._closeDialog();
        },

        _getSelected: function () {
          var sV4 = this._oSelectedContext.sPath
          sV4 = sV4.replace('(', "(guid'")
          sV4 = sV4.replace(')', "')")
          console.log(sV4);
          ///Storage(2f33d046-13a8-442c-aebc-5a687891be7e)
          return sV4;
        },

        _getInputs: function () {
          var name = this._byId("idNameInput").getValue();
          var bf = this._byId("idBuildingFloorSelect").getSelectedKey();
          var map = this._byId("idMapInput").getValue();
          var locIns = this._byId("idTextLocInsInput").getValue();

          return {
            name: name,
            buildingFloor_ID: bf,
            map: map,
            locationInstructions: locIns,
          };
        },

        _getErrorMsg: (oError) =>
          JSON.parse(oError.responseText).error.message.value,
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

        _byId: function (sId) {
          return sap.ui.core.Fragment.byId("usdlg", sId);
        },
      }
    );
  }
);
