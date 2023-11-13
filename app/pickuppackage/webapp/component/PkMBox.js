sap.ui.define(
  ["sap/ui/base/ManagedObject", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (ManagedObject, MessageBox, MessageToast) {
    "use strict";

    function _parseElem(elem) {
      return elem.replaceAll("(", ")").split(")")[1];
    }

    function _getErrorMsg(oError) {
      return JSON.parse(oError.responseText).error.message.value;
    }

    return ManagedObject.extend(
      "com.sap.internal.digitallab.packagehandling.app.pickuppackage.component.PkMBox",
      {
        constructor: function (oModel, oRouter) {
          this._oModel = oModel;
          this._oRouter = oRouter;
        },

        onPickUpPress: function (aPaths) {
          MessageBox.warning(
            "Pickup this package? \n\n A notification will be sent to the recipient and package process will be closed.",
            {
              title: "Pick Up",
              actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
              emphasizedAction: MessageBox.Action.OK,
              onClose: (sAction) => {
                if (sAction === "OK") {
                  aPaths.forEach((sPath) => {
                    var ctx = _parseElem(sPath);
                    this._pickup(ctx);
                  });
                }
              },
              error: function () {},
            }
          );
        },

        _pickup: function (ctx) {
          const oContext = this._oModel.bindContext("/pickup(...)");
          oContext
            .setParameter("packageId", ctx)
            .execute()
            .then(
              () => {
                MessageToast.show("Package Picked Up!");
                this._oModel.refresh();
                this._oRouter.navTo("done");
              },
              (oError) => {
                if (!oError.canceled)
                  MessageBox.alert(_getErrorMsg(oError), {
                    icon: MessageBox.Icon.ERROR,
                    title: "Error",
                  });
              }
            );
        },
        // onPickUpPress: function (sPath) {
        //   MessageBox.warning(
        //     "Pickup this package? \n\n A notification will be sent to the recipient and package process will be closed.",
        //     {
        //       title: "Pick Up",
        //       actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
        //       emphasizedAction: MessageBox.Action.OK,
        //       onClose: (sAction) => {
        //         if (sAction === "OK") {
        //           var oModel = this._oModel;
        //           var ctx = _parseElem(sPath);
        //           console.log(ctx);
        //           const oContext = oModel.bindContext("/pickup(...)");

        //           oContext
        //             .setParameter("packageId", ctx)
        //             .execute()
        //             .then(
        //               () => {
        //                 MessageToast.show("Package Picked Up!");
        //                 this._oModel.refresh();
        //                 this._oRouter.navTo("done");
        //               },
        //               (oError) => {
        //                 if (!oError.canceled)
        //                   MessageBox.alert(_getErrorMsg(oError), {
        //                     icon: MessageBox.Icon.ERROR,
        //                     title: "Error",
        //                   });
        //               }
        //             );
        //         }
        //       },
        //       error: function () {},
        //     }
        //   );
        // },
      }
    );
  }
);