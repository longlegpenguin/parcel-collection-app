sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend("com.sap.internal.digitallab.packagehandling.app.manage.companies.ext.component.CCompanyDlg", {
      constructor: function (oExtensionAPI) {
        this._oExtensionAPI = oExtensionAPI;
      },

      load: function () {
        this._oExtensionAPI
          .loadFragment({
            id: "ccdlg",
            name: "com.sap.internal.digitallab.packagehandling.app.manage.companies.ext.view.CCompanyDlg",
            controller: this,
          })
          .then(function (oDialog) {
            oDialog.open();
          });
      },

      onDialogBeforeOpen: function (oEvent) {
        console.log("onBeforeOpen");
        this._oCCompanyDlg = oEvent.getSource();
        this._oExtensionAPI.addDependent(this._oCCompanyDlg);
      },

      onDialogAfterClose: function (oEvent) {
        this._oExtensionAPI.removeDependent(this._oCCompanyDlg);
        this._oCCompanyDlg.destroy();
        this._oCCompanyDlg = undefined;
        this._oExtensionAPI.refresh();
      },

      onCreateButtonPress: function (oEvent) {
        this._setBusy(true);
        var postData = this._getInputs();
        var oModel = this._oExtensionAPI.getModel("MyModel");

        var fnSuccess = function () {
          this._setBusy(false);
          this._closeDialog();
          MessageToast.show("Created!");
        }.bind(this);

        var fnError = function (oError) {
          this._setBusy(false);
          this._showErrorMsg(oError);
        }.bind(this);

        var oContext = oModel.createEntry("/DeliveryCompany", {
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
        var logo = this._byId("idLogoInput").getValue();
        
        return {
          name: name,
          logo: logo,
        };
      },

      _showErrorMsg(oError) {
        var msg = this._getErrorMsg(oError);
        MessageBox.error(msg);
      },

      _getErrorMsg(oError) {
        return JSON.parse(oError.responseText).error.message.value;
      },

      _setBusy: function (bBusy) {
        this._oCCompanyDlg.setBusy(bBusy);
      },

      _closeDialog: function () {
        this._oCCompanyDlg && this._oCCompanyDlg.close();
      },

      _byId: function (sId) {
        return sap.ui.core.Fragment.byId("ccdlg", sId);
      },
    });
  }
);
