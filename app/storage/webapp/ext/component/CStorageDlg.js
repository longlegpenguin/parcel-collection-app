sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/base/ManagedObject",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
  ],
  function (
    Controller,
    MessageBox,
    MessageToast,
    ManagedObject,
    JSONModel,
    ODataModel
  ) {
    "use strict";
    console.log("fff");
    return Controller.extend(
      "packagehandling.app.storage.ext.component.CStorageDlg",
      {
        constructor: function (oExtensionAPI) {
          this._oExtensionAPI = oExtensionAPI;
          // var oViewModel = new JSONModel({
          //   name: "name",
          //   buildingFloor: "bf",
          //   map: "map",
          //   locationInstructions: "locIns",
          // });
          // sap.ui.getCore().setModel(oViewModel, "storageEntry");
        },

        load: function () {
          this._oExtensionAPI
            .loadFragment({
              id: "csdlg",
              name: "packagehandling.app.storage.ext.view.CStorageDlg",
              controller: this,
            })
            .then(function (oDialog) {
              oDialog.open();
            });
        },

        onBeforeOpen: function (oEvent) {
          console.log("onBeforeOpen");
          this._oCStorageDlg = oEvent.getSource();
          this._oExtensionAPI.addDependent(this._oCStorageDlg);
        },

        onAfterClose: function (oEvent) {
          console.log("onAfterClose");
          this._oExtensionAPI.removeDependent(this._oCStorageDlg);
          this._oCStorageDlg.destroy();
          this._oCStorageDlg = undefined;
        },

        onCreateButtonPress: function (oEvent) {
          var name = this._byId("idNameInput").getValue();
          var bf = this._byId("idBfInput").getValue();
          var map = this._byId("idMapInput").getValue();
          var locIns = this._byId("idTextLocInsInput").getValue();

          var postData = {
            name: name,
            buildingFloor: bf,
            map: map,
            locationInstructions: locIns,
          };
          console.log("post data:" + postData);

          // Set the model to the core or a specific control
          // sap.ui.getCore().setModel(oModel, "CStroageJModel");
          var localServiceUrl = "/odata/v4/StorageService/";

          var oModel = this._oExtensionAPI.getModel("MyModel");

          console.log("oModel" + oModel);

          // // oModel.attachMetadataLoaded(function () {
          var oContext = oModel.createEntry("/Storage", {
            properties: postData,
            success: function () {
              console.log("Created storage entry");
            },
            error: function () {
              console.error("Faile to create storage entry");
            },
          });
          // });

          console.log("Was here2");

          var fnSuccess = function () {
            this._setBusy(false);
            this._closeDialog();
            MessageToast.show("Created!");
          }.bind(this);

          var fnError = function (oError) {
            this._setBusy(false);
            MessageBox.error(oError.message);
          }.bind(this);

          // submit the changes: creates entity in the back end
          oModel.submitChanges({
            success: fnSuccess,
            error: fnError,
          });

          // // handle successful creation or reset
          // oContext.created().then(
          //   function () {
          //     /* successful creation */
          //     console.log("successed");
          //   },
          //   function () {
          //     /* deletion of the created entity before it is persisted */
          //     console.log("front-end bad");
          //   }
          // );

          // delete the created entity
          oContext.delete();
        },

        onCancel: function (oEvent) {
          console.log("close cliacked");
          this._closeDialog();
        },

        _setOkButtonEnabled: function (bOk) {
          this._oCStorageDlg &&
            this._oCStorageDlg.getBeginButton().setEnabled(bOk);
        },

        _setBusy: function (bBusy) {
          this._oCStorageDlg.setBusy(bBusy);
        },

        _closeDialog: function () {
          this._oCStorageDlg && this._oCStorageDlg.close();
        },

        _showError: function (sMessage) {
          MessageBox.error(sMessage || "Upload failed");
        },

        // TODO: Better option for this?
        _byId: function (sId) {
          return sap.ui.core.Fragment.byId("csdlg", sId);
        },
      }
    );
  }
);
