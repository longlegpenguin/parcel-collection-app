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

        onDialogBeforeOpen: function (oEvent) {
          this._oConfirmDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oConfirmDlg);
        },

        onDialogAfterClose: function (oEvent) {
          this._oExtensionAPI.removeDependent(this._oConfirmDlg);
          this._oConfirmDlg.destroy();
          this._oConfirmDlg = undefined;
          this._oExtensionAPI.refresh();
        },

        _parseElem(elem) {
            return elem.replaceAll('(', ')').split(')')[1]
        },

        onSaveButtonPress: function (oEvent) {
          this._aSelectedContext.forEach((elem) => {
            console.log("Confirming Selected : " + this._parseElem(elem.toString()));
          });
          
          var oData = this._getInputs();
          console.log(JSON.stringify(oData));
        //   var oModel = this._oExtensionAPI.getModel("MyModel");

        //   var fnSuccess = function () {
        //     this._setBusy(false);
        //     this._closeDialog();
        //     MessageToast.show("Created!");
        //   }.bind(this);

        //   var fnError = function (oError) {
        //     this._setBusy(false);
        //     var msg = this._getErrorMsg(oError);
        //     MessageBox.error(msg);
        //   }.bind(this);

        //   var oContext = oModel.createEntry("/StorageSlot", {
        //     properties: oData,
        //     success: fnSuccess,
        //     error: fnError,
        //   });

        //   oModel.submitChanges({
        //     success: function () {},
        //     error: function () {},
        //   });
        //   oContext.delete();
        },

        onStorageSelectChange: function (oEvent) {
          var selectedStorageKey = oEvent.getSource().getSelectedKey();
          var oSlotComboBox = this._byId("idStorageSlotSelect");
          var oBinding = oSlotComboBox.getBinding("items");

          oBinding.filter(
            new sap.ui.model.Filter(
              "storage_ID",
              sap.ui.model.FilterOperator.EQ,
              selectedStorageKey
            )
          );

          console.log("selected storage ky: " + selectedStorageKey);
          console.log("binding: " + oBinding);
        },

        onCloseButtonPress: function (oEvent) {
          console.log("close cliacked");
          this._closeDialog();
        },

        _getSelected: function () {
          var sV4 = this._aSelectedContext.sPath;
          sV4 = sV4.replaceAll("(", "(guid'");
          sV4 = sV4.replaceAll(")", "')");
          console.log(sV4);
          return sV4;
        },

        _getInputs: function () {
          var s = this._byId("idStorageSelect").getSelectedKey();
          var sl = this._byId("idStorageSlotSelect").getSelectedKey();
          var aPackIds = this._aSelectedContext.map(elem => this._parseElem(elem.toString()));
          
          return {
            slotId: sl,
            packagesIds: aPackIds
          };
        },

        _getErrorMsg(oError) {
          return JSON.parse(oError.responseText).error.message.value;
        },

        _setOkButtonEnabled: function (bOk) {
          this._oConfirmDlg &&
            this._oConfirmDlg.getBeginButton().setEnabled(bOk);
        },

        _setBusy: function (bBusy) {
          this._oConfirmDlg.setBusy(bBusy);
        },

        _closeDialog: function () {
          this._oConfirmDlg && this._oConfirmDlg.close();
        },
        _byId: function (sId) {
          return sap.ui.core.Fragment.byId("cdlg", sId);
        },
      }
    );
  }
);
