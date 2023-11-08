sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
    function (Controller, MessageBox, MessageToast) {
      "use strict";
      return Controller.extend(
        "com.sap.internal.digitallab.packagehandling.app.manage.storages.ext.component.MassCreateDlg",
        {
          constructor: function (oExtensionAPI, oBindingContext) {
            this._oExtensionAPI = oExtensionAPI;
            this._oSelectedContext = oBindingContext;
          },
  
          load: function () {
            this._oExtensionAPI
              .loadFragment({
                id: "mcdlg",
                name: "com.sap.internal.digitallab.packagehandling.app.manage.storages.ext.view.MassCreateDlg",
                controller: this,
              })
              .then(function (oDialog) {
                oDialog.open();
              });
          },
  
          onDialogBeforeOpen: function (oEvent) {
            this._oCSlotDlg = oEvent.getSource();
            this._oExtensionAPI.addDependent(this._oCSlotDlg);
  
            var fnSuccess = function (oData) {
              sap.ui.core.Fragment.byId("mcdlg", "idIdInput").setValue(oData.ID)
            };
  
            var oModel = this._oExtensionAPI.getModel("MyModel");
            oModel.read(this._translate(), {
              success: fnSuccess,
              error: function () {},
            });
          },
  
          onDialogAfterClose: function (oEvent) {
            this._oExtensionAPI.removeDependent(this._oCSlotDlg);
            this._oCSlotDlg.destroy();
            this._oCSlotDlg = undefined;
            this._oExtensionAPI.refresh();
          },
  
          onCreateButtonPress: function (oEvent) {
            var oPayload = this._getInputs();
            console.log(JSON.stringify(oPayload));
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
            // console.log(this._oExtensionAPI);
            // this._oExtensionAPI._controller.ExtensionAPI.invokeActions("/massCreate",[],oPayload ).then( (response) =>{
            //     console.log(response);
            //     this.onCloseButtonPress();
            //     //once object creation is successful then navigate to object page in edit mode
            //     // oController.extensionAPI.getNavigationController().navigateInternal(response[0].response.context);
            // }).catch((oError)=>{
            //     //  oController.extensionAPI.securedExecution(function(){});
            //      MessageBox.show(this._getErrorMsg(oError))
            // });
            var oContext = oModel.callFunction("/massCreate", {
                method: "POST",
                urlParameters: oPayload,
                success: fnSuccess,
                error: fnError
            });
  
            // oModel.submitChanges({
            //   success: function () {},
            //   error: function () {},
            // });
            // oContext.delete();
          },
  
          onCloseButtonPress: function (oEvent) {
            console.log("close cliacked");
            this._closeDialog();
          },
  
          _translate: function () {
            var sV4 = this._oSelectedContext.sPath
            sV4 = sV4.replace('(', "(guid'")
            sV4 = sV4.replace(')', "')")
            console.log(sV4);
            return sV4;
          },
  
          _getInputs: function () {
            var rn = this._byId("idRowNumInput").getValue();
            var cn = this._byId("idColNumInput").getValue();
            var ct = this._byId("idColTypeSelect").getSelectedKey();
            var rt = this._byId("idRowTypeSelect").getSelectedKey();
            var stId = this._byId("idIdInput").getValue();
            
            console.log(stId);
            return {
                "row" :rn,
                "rowType" : rt,
                "col" : cn,
                "colType" : ct,
                "storage" : stId
            };
          },
  
          _getErrorMsg(oError) {
            return JSON.parse(oError.responseText).error.message.value;
          },
  
          _setOkButtonEnabled: function (bOk) {
            this._oCSlotDlg &&
              this._oCSlotDlg.getBeginButton().setEnabled(bOk);
          },
  
          _setBusy: function (bBusy) {
            this._oCSlotDlg.setBusy(bBusy);
          },
  
          _closeDialog: function () {
            this._oCSlotDlg && this._oCSlotDlg.close();
          },
          _byId: function (sId) {
            return sap.ui.core.Fragment.byId("mcdlg", sId);
          },
        }
      );
    }
  );
  