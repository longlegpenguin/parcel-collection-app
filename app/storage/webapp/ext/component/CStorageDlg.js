sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/base/ManagedObject",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
  ],
  function (Controller, MessageBox, ManagedObject, JSONModel, ODataModel) {
    "use strict";
    console.log("fff");
    return Controller.extend(
      "packagehandling.app.storage.ext.component.CStorageDlg",
      {
        constructor: function (oExtensionAPI) {
          this._oExtensionAPI = oExtensionAPI;

          var oViewModel = new JSONModel({
            name: "name",
            buildingFloor: "bf",
            map: "map",
            locationInstruction: "locIns",
          });
          sap.ui.getCore().setModel(oViewModel, "storageEntry");
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
        onFuck: function (oEvent) {
          console.log("Fuck");
        },

        onOk: function (oEvent) {
          console.log("ok cliacked");
          var name = this._byId("name").getValue();
          var bf = this._byId("bf").getValue();
          var map = this._byId("map").getValue();
          var locIns = this._byId("locIns").getValue();

          var postData = {
            name: name,
            buildingFloor: bf,
            map: bf,
            locationInstruction: locIns,
          };
          console.log("post data:" + postData);
/*
          var oForm = this._byId("storageForm"),
            oBinding = oForm.bindElement({
              path: "/Storage",
              parameters: { $$updateGroupId: "storageGroup" },
            });
          // var oList = sap.ui.core.ListItem.byId("StorageList");
          // console.log("List" + oList);
          // var oBinding = oForm.getBinding("items"),
          var oContext = oBinding.create(postData);
          console.log(oForm);
          console.log(oForm.getBinding("binding"));
          console.log(oForm.getBindingContext());
          oForm.getBindingContext().create();
          var fnSuccess = function () {
            this._setBusy(false);
            MessageToast.show("Success");
          }.bind(this);

          var fnError = function (oError) {
            this._setBusy(false);
            MessageBox.error(oError.message);
          }.bind(this);

          var oModel = this._oExtensionAPI.getModel();

          this._setBusy(true); // Lock UI until submitBatch is resolved.
          oModel.submitBatch("storageGroup").then(fnSuccess, fnError);
*/
          // Assuming you have an ODataModel already created
          // Create a JSONModel and set data
          // var oModel = new JSONModel(postData);

          // Set the model to the core or a specific control
          // sap.ui.getCore().setModel(oModel, "CStroageJModel");
          var localServiceUrl = "/odata/v4/StorageService/";
          // var localServiceUrl = "localService/metadata.xml";
          // Create an OData model with a placeholder URL
          // var oModel = new ODataModel(
          //   localServiceUrl,
          //   {
          //     json: true, // Specify that the service uses JSON format
          //     useBatch: false, // If you don't want to use batch requests
          //   }
          // );
          // sap.ui.getCore().setModel(oModel);
          // sap.ui.getCore().setModel(oModel, "CStroageJModel");

          var oModel = sap.ui.getCore().getModel("MyModel");
          oModel = this._oExtensionAPI.getModel("MyModel");
          // // oModel.refreshMetadata();

          console.log("oModel" + oModel);
          var oContext;

          // // oModel.attachMetadataLoaded(function () {
          oContext = oModel.createEntry("/Storage", {
            properties: postData,
            success: function () {
              // Handle the successful response here
              console.log("submit successed " + data);
            },
            error: function () {
              // Handle errors here
              console.error("error");
            },
          });

          // console.log(oContext);
          // console.log("Was here");
          // });
          console.log("Was here2");

          // submit the changes: creates entity in the back end
          oModel.submitChanges({
            success: function (data) {
              // Handle the successful response here
              console.log("submit successed " + data);
            },
            error: function (error) {
              // Handle errors here
              console.error(error);
            },
          });
          // // handle successful creation or reset
          oContext.created().then(
            function () {
              /* successful creation */
              console.log("successed");
            },
            function () {
              /* deletion of the created entity before it is persisted */
            }
          );

          // delete the created entity
          // oContext.delete();
          // oModel.create("/Storage", postData, {
          //   success: function (data) {
          //     // Handle the successful response here
          //     console.log(data);
          //   },
          //   error: function (error) {
          //     // Handle errors here
          //     console.error(error);
          //   },
          // });
          // this._setDialogBusy(true);
          MessageBox.error("Not implemented");
        },

        onCancel: function (oEvent) {
          console.log("close cliacked");
          this._closeDialog();
        },

        _setOkButtonEnabled: function (bOk) {
          this._oCStorageDlg &&
            this._oCStorageDlg.getBeginButton().setEnabled(bOk);
        },

        _setDialogBusy: function (bBusy) {
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
