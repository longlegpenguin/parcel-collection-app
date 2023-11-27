sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend("com.sap.internal.digitallab.packagehandling.app.manage.companies.ext.component.ECompanyDlg", {
      constructor: function (oExtensionAPI, aSelectedContexts) {
        this._oExtensionAPI = oExtensionAPI;
        this._oSelectedContext = aSelectedContexts[0];
      },

      /**
       * Loads the edit company dialog.
       */
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

      /**
       * Preloads the data from back-end service into local data before dialog opens.
       * @param {Object} oEvent the event by which the dialog open
       */
      onDialogBeforeOpen: function (oEvent) {
        this._oECompanyDlg = oEvent.getSource();
        this._oExtensionAPI.addDependent(this._oECompanyDlg);

        var fnSuccess = function (oData) {
          var byId = (sId) => sap.ui.core.Fragment.byId("ecdlg", sId);
          var setInput = (sId, sValue) => byId(sId).setValue(sValue);
          setInput("idNameInput", oData.name);
          setInput("idLogoInput", oData.logo);
        };

        var oModel = this._oExtensionAPI.getModel("MyModel");
        oModel.read(this._getSelected(), {
          success: fnSuccess,
          error: function () { },
        });
      },

      /**
       * Removes the dialog and refresh the page after dialog closed.
       * @param {Object} oEvent 
       */
      onDialogAfterClose: function (oEvent) {
        this._oExtensionAPI.removeDependent(this._oECompanyDlg);
        this._oECompanyDlg.destroy();
        this._oECompanyDlg = undefined;
        this._oExtensionAPI.refresh();
      },

      /**
       * On press the save button, submits the edited content to back-end.
       * @param {Object} oEvent 
       */
      onSaveButtonPress: function (oEvent) {
        this._setBusy(true);
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

      /**
       * On press the close button, close the dialog.
       * @param {Object} oEvent 
       */
      onCloseButtonPress: function (oEvent) {
        this._closeDialog();
      },

      /**
       * Transform the v4 syntax context path to v2 syntax context path.
       * @returns the v2 context path of selected list item. 
       */
      _getSelected: function () {
        var sV4 = this._oSelectedContext.sPath;
        var sV2 = sV4.replace("(", "(guid'").replace(")", "')");
        return sV2;
      },

      /**
       * Get the user inputs from the dialog.
       * @returns dictionary of attribute value pair.
       */
      _getInputs: function () {
        var name = this._byId("idNameInput").getValue();
        var logo = this._byId("idLogoInput").getValue();

        return {
          name: name,
          logo: logo,
        };
      },

      /**
       * Extracts the error message from error object.
       * @param {Object} oError the error object.
       * @returns the error message.
       */
      _getErrorMsg: (oError) =>
        JSON.parse(oError.responseText).error.message.value,

      /**
       * Displays the error message with a message box.
       * @param {Object} oError the error object.
       */
      _showErrorMsg(oError) {
        var msg = this._getErrorMsg(oError);
        MessageBox.error(msg);
      },

      /**
       * Sets the dialog state to busy or not busy.
       * @param {Boolean} bBusy busy or not busy
       */
      _setBusy: function (bBusy) {
        this._oECompanyDlg.setBusy(bBusy);
      },

      /**
       * Closes the dialog.
       */
      _closeDialog: function () {
        this._oECompanyDlg && this._oECompanyDlg.close();
      },

      /**
       * Retrieves the html element from the current dialog.
       * @param {String} sId id of the element to retrieve.
       * @returns the element with the given id.
       */
      _byId: function (sId) {
        return sap.ui.core.Fragment.byId("ecdlg", sId);
      },
    });
  }
);
