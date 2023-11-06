sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend("com.sap.internal.digitallab.packagehandling.app.manage.companies.ext.component.ECompanyDlg", {
      constructor: function (oExtensionAPI, aSelectedContexts) {
        this._oExtensionAPI = oExtensionAPI;
        this._oSelectedContext = aSelectedContexts[0];
        console.log(this._oSelectedContext.sPath);
      },

      load: function () {
        this._oExtensionAPI
          .loadFragment({
            id: "ecdlg",
            name: "com.sap.internal.digitallab.packagehandling.app.manage.companies.ext.view.ECompanyDlg",
            controller: this,
          })
          .then(function (oDialog) {
            oDialog.open();
          });
      },

      onDialogBeforeOpen: function (oEvent) {
        console.log("onBeforeOpen");
        this._oECompanyDlg = oEvent.getSource();
        this._oExtensionAPI.addDependent(this._oECompanyDlg);

        var fnSuccess = function (oData) {
          var d = JSON.stringify(oData, null, 4);
          console.log("read:" + d);
          var byId = (sId) => sap.ui.core.Fragment.byId("ecdlg", sId);
          var setInput = (sId, sValue) => byId(sId).setValue(sValue);
          setInput("idNameInput", oData.name);
          setInput("idLogoInput", oData.logo);
        };

        var oModel = this._oExtensionAPI.getModel("MyModel");
        oModel.read(this._getSelected(), {
          success: fnSuccess,
          error: function () {},
        });
      },

      onDialogAfterClose: function (oEvent) {
        this._oExtensionAPI.removeDependent(this._oECompanyDlg);
        this._oECompanyDlg.destroy();
        this._oECompanyDlg = undefined;
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
          this._showErrorMsg(oError);
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
        var logo = this._byId("idLogoInput").getValue();

        return {
          name: name,
          logo: logo,
        };
      },

      _getErrorMsg: (oError) =>
        JSON.parse(oError.responseText).error.message.value,

      _showErrorMsg(oError) {
        var msg = this._getErrorMsg(oError);
        MessageBox.error(msg);
      },

      _setBusy: function (bBusy) {
        this._oECompanyDlg.setBusy(bBusy);
      },

      _closeDialog: function () {
        this._oECompanyDlg && this._oECompanyDlg.close();
      },

      _byId: function (sId) {
        return sap.ui.core.Fragment.byId("ecdlg", sId);
      },
    });
  }
);
