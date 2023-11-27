sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, MessageBox, MessageToast) {
    "use strict";

    return BaseController.extend(
      "com.sap.internal.digitallab.packagehandling.app.register.packages.controller.Registration",
      {
        /**
         * On init, read and cached useful data from back-end 
         * into dictionary.
         */
        onInit: function () {
          this._dic = {};
          $.get({
            url: "odata/v4/RegistrationService/User",
            success: (oData) => {
              oData.value.forEach((c) => {
                this._dic[c.sapId] = c.ID;
              });
            },
            error: function (error) {
              console.log("Error: " + JSON.stringify(error, null, 4));
            },
          });
        },

        /**
         * Preselects the receptionist as the current user.
         * If the current user is a receptionist.
         */
        onBeforeRendering: function () {
          var oUser = sap.ushell.Container.getUser();
          var sCurrentUser = oUser.getId();
          this.getView()
            .byId("idReceptionistSelect")
            .setSelectedKey(sCurrentUser);
        },

        /**
         * Submits the form data to back-end.
         * Navigates to manage package page.
         * @param {Object} oEvent 
         */
        onSaveButtonPress: function (oEvent) {
          var oData = this._getInputs();
          var fnSuccess = function () {
            MessageToast.show("Created! Navigating to Package Management...");
            this._resetInputs();
            this._navToPack();
          }.bind(this);
          this._postPack(oData, fnSuccess);
        },

        /**
         * Submits the form data to back-end.
         * Clear form and waits for another entry.
         * @param {Object} oEvent 
         */
        onSaveAndNewButtonPress: function (oEvent) {
          var oData = this._getInputs();
          var fnSuccess = function () {
            MessageToast.show("Created!");
            this._resetInputs();
          }.bind(this);
          this._postPack(oData, fnSuccess);
        },

        /**
         * Clear form and navigate back for one step.
         * @param {Object} oEvent 
         */
        onDiscardButtonPress: function (oEvent) {
          this._resetInputs();
          this._navBack();
        },

        /**
         * Navigates to manage package application. 
         */
        _navToPack: function () {
          var oCrossAppNavigator = sap.ushell.Container.getService(
            "CrossApplicationNavigation"
          );
          var targetApp = {
            target: {
              semanticObject: "Packages",
              action: "manage",
            },
          };
          oCrossAppNavigator.toExternal(targetApp);
        },

        /**
         * Post request for a package with given data.
         * @param {Object} oData payload
         * @param {Function} fnSuccess function to be executed if success.
         */
        _postPack(oData, fnSuccess) {
          var oModel = this.getView().getModel("MyModel");

          var fnError = function (oError) {
            this._showErrorMsg(oError);
          }.bind(this);

          var oContext = oModel.createEntry("/Package", {
            properties: oData,
            success: fnSuccess,
            error: fnError,
          });

          oModel.submitChanges({
            success: function () { },
            error: function () { },
          });
          oContext.delete();
        },

        _showErrorMsg(oError) {
          var msg = this._getErrorMsg(oError);
          MessageBox.error(msg);
        },

        _getErrorMsg(oError) {
          return JSON.parse(oError.responseText).error.message.value;
        },

        _resetInputs() {
          var oLocalModel = this.getView().getModel("localData");
          oLocalModel.setProperty("/data/recipient_ID", "");
          oLocalModel.setProperty("/data/type", "normal");
          oLocalModel.setProperty("/data/company", "DHL");
          oLocalModel.setProperty("/data/comment", "");
        },

        _navBack() {
          window.history.go(-1);
        },

        _getInputs() {
          var sRecipient = this.getView()
            .getModel("localData")
            .getProperty("/data/recipient_ID");
          var tp = this.getView()
            .getModel("localData")
            .getProperty("/data/type");
          var dc = this.getView()
            .getModel("localData")
            .getProperty("/data/company");
          var cm = this.getView()
            .getModel("localData")
            .getProperty("/data/comment");
          var recep = this.getView()
            .getModel("localData")
            .getProperty("/data/receptionist_ID");
          return {
            recipient_ID: sRecipient,
            type_code: tp,
            deliveryCompany_ID: dc,
            receptionist_ID: recep,
            comment: cm,
            status_code: "new",
          };
        },
      }
    );
  }
);
