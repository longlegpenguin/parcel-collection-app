sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend(
      "com.sap.internal.digitallab.packagehandling.app.manage.storages.ext.component.CStorageDlg",
      {
        constructor: function (oExtensionAPI) {
          this._oExtensionAPI = oExtensionAPI;
        },

        /**
         * Loads the create storage dialog.
         */
        load: function () {
          this._oExtensionAPI
            .loadFragment({
              id: "csdlg",
              name: "com.sap.internal.digitallab.packagehandling.app.manage.storages.ext.view.CStorageDlg",
              controller: this,
            })
            .then(function (oDialog) {
              oDialog.open();
            });
        },

        /**
         * Assigns dependencies before dialog opens.
         * @param {Object} oEvent 
         */
        onDialogBeforeOpen: function (oEvent) {
          this._oCStorageDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oCStorageDlg);
        },

        /**
         * Removes the dialog and refresh the page after dialog closed.
         * @param {Object} oEvent 
         */
        onDialogAfterClose: function (oEvent) {
          this._oExtensionAPI.removeDependent(this._oCStorageDlg);
          this._oCStorageDlg.destroy();
          this._oCStorageDlg = undefined;
          this._oExtensionAPI.refresh();
        },

        /**
         * On press the create button, submits the filled content to back-end.
         * @param {Object} oEvent 
         */
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
            var msg = this._getErrorMsg(oError);
            MessageBox.error(msg);
          }.bind(this);

          var oContext = oModel.createEntry("/Storage", {
            properties: postData,
            success: fnSuccess,
            error: fnError,
          });

          oModel.submitChanges({
            success: function () { },
            error: function () { },
          });
          oContext.delete();
        },

        /**
         * Closes the dialog.
         */
        onCloseButtonPress: function (oEvent) {
          this._closeDialog();
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

        _getErrorMsg(oError) {
          return JSON.parse(oError.responseText).error.message.value;
        },

        /**
         * Sets the dialog state to busy or not busy.
         * @param {Boolean} bBusy busy or not busy
         */
        _setBusy: function (bBusy) {
          this._oCStorageDlg.setBusy(bBusy);
        },

        _closeDialog: function () {
          this._oCStorageDlg && this._oCStorageDlg.close();
        },

        _byId: function (sId) {
          return sap.ui.core.Fragment.byId("csdlg", sId);
        },
      }
    );
  }
);
