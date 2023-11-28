sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
  ],
  function (Controller, MessageBox, MessageToast, Fragment) {
    "use strict";
    return Controller.extend(
      "com.sap.internal.digitallab.packagehandling.app.manage.storages.ext.component.USlotDlg",
      {
        constructor: function (oExtensionAPI, oBindingContext) {
          this._oExtensionAPI = oExtensionAPI;
          this._oSelectedContext = oBindingContext;
        },

        /**
         * Loads the edit slots dialog.
         */
        load: function () {
          Fragment.load({
            id: "usldlg",
            name: "com.sap.internal.digitallab.packagehandling.app.manage.storages.ext.view.USlotDlg",
            controller: this,
          }).then(function (oDialog) {
            oDialog.open();
          });
        },

        /**
         * Assigns dependencies.
         * Preloads the data from back-end service into local data before dialog opens.
         * @param {Object} oEvent
         */
        onDialogBeforeOpen: function (oEvent) {
          this._oUSlotDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oUSlotDlg);

          var fnSuccess = function (oData) {
            var byId = (sId) => sap.ui.core.Fragment.byId("usldlg", sId);
            var setInput = (sId, sValue) => byId(sId).setValue(sValue);
            setInput("idIdInput", oData.storage_ID);
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

        /**
         * Removes the dialog and refresh the page after dialog closed.
         * @param {Object} oEvent
         */
        onDialogAfterClose: function (oEvent) {
          this._oExtensionAPI.removeDependent(this._oUSlotDlg);
          this._oUSlotDlg.destroy();
          this._oUSlotDlg = undefined;
          this._oExtensionAPI.getController().extensionAPI.refresh();
        },

        /**
         * On press the edit button, submits the edited content to back-end.
         * @param {Object} oEvent
         */
        onSaveButtonPress: function (oEvent) {
          var oData = this._getInputs();
          var oModel = this._oExtensionAPI.getModel("MyModel");
          var fnSuccess = function () {
            this._closeDialog();
            MessageToast.show("Updated!");
          }.bind(this);
          var fnError = function (oError) {
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

        /**
         * Translate the v4 syntax context path to v2 syntax context path.
         * Extracts and create the pure context path for the selected slot
         * (without storage info).
         * @returns the v2 context path of selected slot.
         */
        _getSelected: function () {
          var sV4 = this._oSelectedContext.sPath.split("/")[2];
          var sV2 = sV4
            .replaceAll("(", "(guid'")
            .replaceAll(")", "')")
            .replaceAll("storageSlot", "StorageSlot");
          return "/" + sV2;
        },

        _getInputs: function () {
          var name = this._byId("idNameInput").getValue();
          var av = this._byId("idAvailableCheckBox").getSelected();
          var stId = this._byId("idIdInput").getValue();
          var stc = this._byId("idStatisInput").getValue();

          var sc = av ? stc : "unavailable";
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
