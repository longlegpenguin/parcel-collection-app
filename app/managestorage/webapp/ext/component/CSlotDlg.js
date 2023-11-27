sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend(
      "com.sap.internal.digitallab.packagehandling.app.manage.storages.ext.component.CSlotDlg",
      {
        constructor: function (oExtensionAPI, oBindingContext) {
          this._oExtensionAPI = oExtensionAPI;
          this._oSelectedContext = oBindingContext;
        },

        /**
         * Loads the create slot dialog.
         */
        load: function () {
          this._oExtensionAPI
            .loadFragment({
              id: "csldlg",
              name: "com.sap.internal.digitallab.packagehandling.app.manage.storages.ext.view.CSlotDlg",
              controller: this,
            })
            .then(function (oDialog) {
              oDialog.open();
            });
        },

        /**
         * Assigns dependencies before dialog opens.
         * Preloads data from back-end into the dialog local models.
         * @param {Object} oEvent the event by which the dialog open
         */
        onDialogBeforeOpen: function (oEvent) {
          this._oCSlotDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oCSlotDlg);

          var fnSuccess = function (oData) {
            sap.ui.core.Fragment.byId("csldlg", "idIdInput").setValue(oData.ID)
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
          this._oExtensionAPI.removeDependent(this._oCSlotDlg);
          this._oCSlotDlg.destroy();
          this._oCSlotDlg = undefined;
          this._oExtensionAPI.refresh();
        },

        /**
         * On press the create button, submits the filled content to back-end.
         * @param {Object} oEvent 
         */
        onCreateButtonPress: function (oEvent) {
          this._setBusy(true);
          var oData = this._getInputs();
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
            success: function () { },
            error: function () { },
          });
          oContext.delete();
        },

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
          var av = this._byId("idAvailableCheckBox").getSelected();
          var stId = this._byId("idIdInput").getValue();

          var sc = av ? "empty" : "unavailable"
          return {
            storage_ID: stId,
            name: name,
            status_code: sc,
          };
        },

        _getErrorMsg(oError) {
          return JSON.parse(oError.responseText).error.message.value;
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
