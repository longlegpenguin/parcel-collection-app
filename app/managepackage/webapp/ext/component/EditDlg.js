sap.ui.define(
  ["sap/ui/base/ManagedObject", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (ManagedObject, MessageBox, MessageToast) {
    "use strict";

    return ManagedObject.extend(
      "com.sap.internal.digitallab.packagehandling.app.manage.package.ext.component.EditDlg",
      {
        constructor: function (oExtensionAPI, aSelectedContext) {
          this._oExtensionAPI = oExtensionAPI;
          this._aSelectedContext = aSelectedContext[0].sPath;
        },

        /**
         * Loads the pickup package dialog.
         */
        load: function () {
          this._oExtensionAPI
            .loadFragment({
              id: "edlg",
              name: "com.sap.internal.digitallab.packagehandling.app.manage.package.ext.view.EditDlg",
              controller: this,
            })
            .then(function (oDialog) {
              oDialog.open();
            });
        },

        /**
         * Assigns dependencies before dialog opens.
         * @param {Object} oEvent the event by which the dialog open
         */
        onDialogBeforeOpen: function (oEvent) {
          this._oEditDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oEditDlg);
        },

        /**
         * Removes the dialog and refresh the page after dialog closed.
         * @param {Object} oEvent 
         */
        onDialogAfterClose: function (oEvent) {
          this._oExtensionAPI.removeDependent(this._oEditDlg);
          this._oEditDlg.destroy();
          this._oEditDlg = undefined;
          this._oExtensionAPI.refresh();
        },

        /**
         * On press the save button, submits the user input/modifications in the dialog to back-end.
         * Updates the package status in cache local model.
         * @param {Object} oEvent 
         */
        onSaveButtonPress: function (oEvent) {
          const oModel = this._oExtensionAPI.getModel();
          const oContext = oModel.bindContext(
            "Package('" + this._aSelectedContext + "')",
            null,
            {
              $$updateGroupId: "cmpchange",
            }
          );
          oModel.submitBatch("cmpchange").then(
            () => {
              MessageToast.show("Package Successfully Updated!");
              this._closeDialog();
            },
            (oError) => {
              if (!oError.canceled)
                MessageBox.alert(this._getErrorMsg(oError), {
                  icon: MessageBox.Icon.ERROR,
                  title: "Error",
                });
            }
          );
        },

        _getErrorMsg(oError) {
          return JSON.parse(oError.responseText).error.message.value;
        },

        _closeDialog: function () {
          this._oEditDlg && this._oEditDlg.close();
        },
      }
    );
  }
);
