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

        onDialogBeforeOpen: function (oEvent) {
          this._oEditDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oEditDlg);
        },

        onDialogAfterClose: function (oEvent) {
          this._oExtensionAPI.removeDependent(this._oEditDlg);
          this._oEditDlg.destroy();
          this._oEditDlg = undefined;
          this._oExtensionAPI.refresh();
        },

        _parseElem(elem) {
          return elem.replaceAll("(", ")").split(")")[1];
        },

        onSaveButtonPress: function (oEvent) {
          const oModel = this._oExtensionAPI.getModel();
          const oContext = oModel.bindContext(
            "Package('" + this._aSelectedContext + "')",
            null,
            {
              $$updateGroupId: "cmpchange",
            }
          );

          var oPayload = this._getInputs();
          console.log(JSON.stringify(oPayload));

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
          var rp = this._byId("idUserSelect").getSelectedKey();
          var cm = this._byId("idCommentInput").getValue();
          var st = this._byId("idStatusInput").getValue();
          var rcp = this._byId("idReceptionistSelect").getSelectedKey();
          var pt = this._byId("idPackageTypeSelect").getSelectedKey();
          var dc = this._byId("idDeliveryCompanySelect").getSelectedKey();

          return {
            recipient_ID: rp,
            type_code: pt,
            deliveryCompany_ID: dc,
            receptionist_ID: rcp,
            comment: cm,
            status_code: st,
          };
        },

        _getErrorMsg(oError) {
          return JSON.parse(oError.responseText).error.message.value;
        },

        _setOkButtonEnabled: function (bOk) {
          this._oEditDlg && this._oEditDlg.getBeginButton().setEnabled(bOk);
        },

        _setBusy: function (bBusy) {
          this._oEditDlg.setBusy(bBusy);
        },

        _closeDialog: function () {
          this._oEditDlg && this._oEditDlg.close();
        },
        _byId: function (sId) {
          return sap.ui.core.Fragment.byId("edlg", sId);
        },
      }
    );
  }
);
