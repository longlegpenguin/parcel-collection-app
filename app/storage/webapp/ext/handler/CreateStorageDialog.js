sap.ui.define(
  ["sap/ui/base/ManagedObject", "sap/ui/core/Fragment"],
  function (ManagedObject, Fragment) {
    "use strict";
    let oController;

    return ManagedObject.extend(
      "packagehandling.app.storage.ext.controller.CreateStorageDialog",
      {
        constructor: function (oControllerInstance) {
          oController = oControllerInstance;
        },

        open: function () {
          if (
            !this._oCreateBaselineDialog ||
            this._oCreateBaselineDialog.isDestroyed()
          ) {
            Fragment.load({
              name: "packagehandling.app.storage.ext.view.dialog.CreateStorageDialog",
              controller: this,
            }).then(
              function (oDialog) {
                console.log(oController);
                console.log(Object.getOwnPropertyNames(oController).filter(function (p) {
                    return typeof oController[p] === 'function';
                }));
                oController.getView().addDependent(oDialog);
                this._oCreateBaselineDialog = oDialog;
                oDialog.open();
              }.bind(this)
            );
          }
          if (this._oCreateBaselineDialog) {
            this._oCreateBaselineDialog.open();
          }
        },
        /**
         * @description : Close the create baseline dialog.
         * @param {Object} oEvent
         */
        onPressCancel: function (oEvent) {
          this._oCreateBaselineDialog.close();
        },
      }
    );
  }
);
