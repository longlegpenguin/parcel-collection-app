sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend(
      "com.sap.internal.digitallab.packagehandling.app.manage.storages.ext.component.UStorageDlg",
      {
        constructor: function (oExtensionAPI, aSelectedContexts) {
          this._oExtensionAPI = oExtensionAPI;
          this._oSelectedContext = aSelectedContexts[0];
        },

        /**
         * Loads the edit storage dialog.
         */
        load: function () {
          this._oExtensionAPI
            .loadFragment({
              id: "usdlg",
              name: "com.sap.internal.digitallab.packagehandling.app.manage.storages.ext.view.UStorageDlg",
              controller: this,
            })
            .then(function (oDialog) {
              oDialog.open();
            });
        },

        /**
         * Assigns dependencies.
         * Preloads the data from back-end service into local data before dialog opens.
         * @param {Object} oEvent
         */
        onDialogBeforeOpen: function (oEvent) {
          this._oCStorageDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oCStorageDlg);

          var fnSuccess = function (oData) {
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
            error: function () { },
          });
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
         * On press the save button, submits the edited content to back-end.
         * @param {Object} oEvent 
         */
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

        /**
         * Closes the dialog.
         * @param {Object} oEvent 
         */
        onCloseButtonPress: function (oEvent) {
          this._closeDialog();
        },

        _getSelected: function () {
          var sV4 = this._oSelectedContext.sPath;
          var sV2 = sV4.replace("(", "(guid'").replace(")", "')");
          return sV2;
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

        _setBusy: function (bBusy) {
          this._oCStorageDlg.setBusy(bBusy);
        },

        _closeDialog: function () {
          this._oCStorageDlg && this._oCStorageDlg.close();
        },

        _byId: function (sId) {
          return sap.ui.core.Fragment.byId("usdlg", sId);
        },
      }
    );
  }
);
