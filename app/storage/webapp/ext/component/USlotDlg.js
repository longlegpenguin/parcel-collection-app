sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend(
      "packagehandling.app.storage.ext.component.USlotDlg",
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
              id: "usldlg",
              name: "packagehandling.app.storage.ext.view.USlotDlg",
              controller: this,
            })
            .then(function (oDialog) {
              oDialog.open();
            });
        },

        onDialogBeforeOpen: function (oEvent) {
          this._oUSlotDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oUSlotDlg);

          var fnSuccess = function (oData) {
            var d = JSON.stringify(oData, null, 4);
            // console.log(d);
            var byId = (sId) => sap.ui.core.Fragment.byId("usldlg", sId);
            var setInput = (sId, sValue) => byId(sId).setValue(sValue);
            setInput("idIdInput", oData.ID);
            setInput("idNameInput", oData.name);
            setInput("idStatisInput", oData.status_code);
            byId("idAvailableCheckBox").setSelected(
              oData.status_code !== "unavailable"
            );
          };

          var oModel = this._oExtensionAPI.getModel("MyModel");
          oModel.read(this._getSelected(), {
            success: fnSuccess,
            error: function () {},
          });
        },

        onDialogAfterClose: function (oEvent) {
          this._oExtensionAPI.removeDependent(this._oUSlotDlg);
          this._oUSlotDlg.destroy();
          this._oUSlotDlg = undefined;
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
          var sV4 = this._oSelectedContext.sPath;
          sV4 = sV4.replace("(", "(guid'");
          sV4 = sV4.replace(")", "')");
          console.log(sV4);
          return sV4;
        },

        _getInputs: function () {
          var name = this._byId("idNameInput").getValue();
          var av = this._byId("idAvailableCheckBox").getSelected();
          var stId = this._byId("idIdInput").getValue();
          var stc = this._byId("idStatisInput").getValue();

          var sc = av ? stc : "unavailable";
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
          this._oUSlotDlg && this._oUSlotDlg.getBeginButton().setEnabled(bOk);
        },

        _setBusy: function (bBusy) {
          this._oUSlotDlg.setBusy(bBusy);
        },

        _closeDialog: function () {
          this._oUSlotDlg && this._oUSlotDlg.close();
        },
        _byId: function (sId) {
          return sap.ui.core.Fragment.byId("usldlg", sId);
        },
      }
    );
  }
);
