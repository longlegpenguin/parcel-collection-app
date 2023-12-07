sap.ui.define(
  ["sap/ui/base/ManagedObject", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (ManagedObject, MessageBox, MessageToast) {
    "use strict";

    return ManagedObject.extend(
      "com.sap.internal.digitallab.packagehandling.app.manage.package.ext.component.ConfirmDlg",
      {
        constructor: function (oExtensionAPI, aSelectedContext) {
          this._oExtensionAPI = oExtensionAPI;
          this._aSelectedContext = aSelectedContext;
        },

        /**
         * Loads the confirm package dialog.
         */
        load: function () {
          this._oExtensionAPI
            .loadFragment({
              id: "cdlg",
              name: "com.sap.internal.digitallab.packagehandling.app.manage.package.ext.view.ConfirmDlg",
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
          this._oConfirmDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oConfirmDlg);
        },

        /**
         * Removes the dialog and refresh the page after dialog closed.
         * @param {Object} oEvent 
         */
        onDialogAfterClose: function (oEvent) {
          this._oExtensionAPI.removeDependent(this._oConfirmDlg);
          this._oConfirmDlg.destroy();
          this._oConfirmDlg = undefined;
          this._oExtensionAPI.refresh();
        },

        /**
         * On press the save button, submits the confirm request to back-end.
         * Updates the package status in cache local model.
         * @param {Object} oEvent 
         */
        onSaveButtonPress: function (oEvent) {
          var oPayload = this._getInputs();

          this._byId("idConfirmForm")
            .getObjectBinding()
            .setParameter("slotId", oPayload.slotId)
            .setParameter("packagesIds", oPayload.packagesIds)
            .execute()
            .then(
              () => {
                MessageToast.show("Package(s) Confirmed!");
                oPayload.packagesIds.forEach((key) => this._updateCache(key));
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

        /**
         * Filters the slot drop down value according to the storage dropdown selection.
         * Filters also the unavailable slots.
         * @param {Object} oEvent 
         */
        onStorageSelectChange: function (oEvent) {
          var selectedStorageKey = oEvent.getSource().getSelectedKey();
          var oSlotComboBox = this._byId("idStorageSlotSelect");
          var oBinding = oSlotComboBox.getBinding("items");

          oBinding.filter(
            new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter({
                        path: "storage_ID",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: selectedStorageKey,
                    }),
                    new sap.ui.model.Filter({
                        path: "status_code",
                        operator: sap.ui.model.FilterOperator.NE,
                        value1: "unavailable",
                    })
                ],
                and: true
            })
          );
        },

        /**
         * On press the close button, close the dialog.
         * @param {Object} oEvent 
         */
        onCloseButtonPress: function (oEvent) {
          this._closeDialog();
        },

        /**
         * Retrieves data required for confirmation from the user interface. 
         * @returns dictionary of attribute value pair.
         */
        _getInputs: function () {
          var sl = this._byId("idStorageSlotSelect").getSelectedKey();
          var aPackIds = this._aSelectedContext.map((elem) =>
            this._parseElem(elem.toString())
          );
          return {
            slotId: sl,
            packagesIds: aPackIds,
          };
        },

        _getErrorMsg(oError) {
          return JSON.parse(oError.responseText).error.message.value;
        },

        _closeDialog: function () {
          this._oConfirmDlg && this._oConfirmDlg.close();
        },

        _byId: function (sId) {
          return sap.ui.core.Fragment.byId("cdlg", sId);
        },

        /**
         * Parse out the package id from the context path
         * @param {String} elem the context path `/...(...)`
         * @returns the package id
         */
        _parseElem(elem) {
          return elem.replaceAll("(", ")").split(")")[1];
        },

        _updateCache: function (key) {
          var oModel = this._oExtensionAPI._view.getModel("cache");
          oModel[key].confirmable = false;
          oModel[key].pickable = true;
          this._oExtensionAPI._view.setModel(oModel, "cache");
        },
      }
    );
  }
);
