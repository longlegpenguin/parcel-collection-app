sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, MessageBox, MessageToast, History) {
    "use strict";

    return BaseController.extend(
      "com.sap.internal.digitallab.packagehandling.app.register.packages.controller.Registration",
      {
        onInit: function () {
          console.log("Registration Controller alive!");

          console.log("Me " + this.getView());
          console.log("Owner Component " + this.getOwnerComponent());
          console.log("model: " + this.getView().getModel());
          console.log("device model: " + this.getView().getModel("device"));
        },

        onBeforeRendering: function () {
          console.log("Here I am");
          var oUser = sap.ushell.Container.getUser();
          var sCurrentUser = oUser.getId();
          this.getView().byId("idReceptionistInput").setValue(sCurrentUser);
        },

        onSaveButtonPress: function (oEvent) {
          var oData = this._getInputs();
          var fnSuccess = function () {
            MessageToast.show("Created!");
            this._resetInputs();
            this._navBack();
          }.bind(this);
          this._postPack(oData, fnSuccess);
        },

        onSaveAndNewButtonPress: function (oEvent) {
          var oData = this._getInputs();
          var fnSuccess = function () {
            MessageToast.show("Created!");
            this._resetInputs();
          }.bind(this);
          this._postPack(oData, fnSuccess);
        },

        onDiscardButtonPress: function (oEvent) {
          this._resetInputs();
          this._navBack();
        },

        _postPack(oData, fnSuccess) {
          var oModel = this.getView().getModel("MyModel");
          console.log(JSON.stringify(oData, null, 4));

          var fnError = function (oError) {
            this._showErrorMsg(oError);
          }.bind(this);

          var oContext = oModel.createEntry("/Package", {
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

        _showErrorMsg(oError) {
          var msg = this._getErrorMsg(oError);
          MessageBox.error(msg);
        },

        _showErrorMsg(oError) {
          var msg = this._getErrorMsg(oError);
          MessageBox.error(msg);
        },

        _getErrorMsg(oError) {
          return JSON.parse(oError.responseText).error.message.value;
        },

        _resetInputs() {
          var oUser = sap.ushell.Container.getUser();
          var sCurrentUser = oUser.getId();
          var oLocalModel = this.getView().getModel("localData");
          oLocalModel.setProperty("/data/recipient", "");
          oLocalModel.setProperty("/data/type", "normal");
          oLocalModel.setProperty("/data/company", "DHL");
          oLocalModel.setProperty("/data/comment", "");
        },

        _navBack() {
          window.history.go(-1);
        },

        _getInputs() {
          var oUser = sap.ushell.Container.getUser();
          var sCurrentUser = oUser.getId();
          var sRecipient = this.getView()
            .getModel("localData")
            .getProperty("/data/recipient");
          var tp = this.getView()
            .getModel("localData")
            .getProperty("/data/type");
          var dc = this.getView()
            .getModel("localData")
            .getProperty("/data/company");
          var cm = this.getView()
            .getModel("localData")
            .getProperty("/data/comment");
          return {
            recipient: sRecipient,
            type_code: tp,
            deliveryCompany_ID: dc,
            receptionist: sCurrentUser,
            comment: cm,
            status_code: "new",
          };
        },
      }
    );
  }
);
