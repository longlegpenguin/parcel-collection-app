sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend(
      "packagehandling.app.storage.ext.component.CSlotDlg",
      {
        constructor: function (oExtensionAPI, oBindingContext) {
          this._oExtensionAPI = oExtensionAPI;
          console.log(oBindingContext);
          this._oSelectedContext = oBindingContext;
          console.log(this._byId("idIdInput"));
        },

        load: function () {
          this._oExtensionAPI
            .loadFragment({
              id: "csldlg",
              name: "packagehandling.app.storage.ext.view.CSlotDlg",
              controller: this,
            })
            .then(function (oDialog) {
              oDialog.open();
            });
        },

        onDialogBeforeOpen: function (oEvent) {
          this._oCSlotDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oCSlotDlg);

          var fnSuccess = function (oData) {
            var d = JSON.stringify(oData, null, 4);
            sap.ui.core.Fragment.byId("csldlg", "idIdInput").setValue(oData.ID)
          };

          var oModel = this._oExtensionAPI.getModel("MyModel");
          oModel.read(this._getSelected(), {
            success: fnSuccess,
            error: function () {},
          });
        },

        onDialogAfterClose: function (oEvent) {
          this._oExtensionAPI.removeDependent(this._oCSlotDlg);
          this._oCSlotDlg.destroy();
          this._oCSlotDlg = undefined;
          this._oExtensionAPI.refresh();
        },

        onCreateButtonPress: function (oEvent) {
          var oData = this._getInputs();
          console.log(JSON.stringify(oData));
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

          var oContext = oModel.createEntry("/StorageSlot", {
            properties: oData,
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

        _getSelected: function () {
          var sV4 = this._oSelectedContext.sPath
          sV4 = sV4.replaceAll('(', "(guid'")
          sV4 = sV4.replaceAll(')', "')")
          console.log(sV4);
          return sV4;
        },

        _getInputs: function () {
          var name = this._byId("idNameInput").getValue();
          var av = this._byId("idAvailableCheckBox").getSelected();
          var stId = this._byId("idIdInput").getValue();
          
          var sc = av ? "empty" : "unavailable"
          console.log("aval " + av + " " + sc);
          console.log(stId);
          return {
            storage_ID: stId,
            name: name,
            status_code: sc,
          };
        },

        _getErrorMsg(oError) {
          return JSON.parse(oError.responseText).error.message.value;
        },

        _setOkButtonEnabled: function (bOk) {
          this._oCSlotDlg &&
            this._oCSlotDlg.getBeginButton().setEnabled(bOk);
        },

        _setBusy: function (bBusy) {
          this._oCSlotDlg.setBusy(bBusy);
        },

        _closeDialog: function () {
          this._oCSlotDlg && this._oCSlotDlg.close();
        },
        _byId: function (sId) {
          return sap.ui.core.Fragment.byId("csldlg", sId);
        },
      }
    );
  }
);
