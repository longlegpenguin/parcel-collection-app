sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";

    function dumb(that) {
      console.log(that);
    }

    return {
      onWarning2MessageBoxPress: function (oBindingContext, aSelectedContexts) {
        MessageBox.warning("Are you sure you want to delete this slot?", {
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          emphasizedAction: MessageBox.Action.OK,
          onClose: (sAction) => {
            var oModel = this._view.getModel("MyModel");
            var sV2 = aSelectedContexts[0].sPath //.split("/")[1]
              .replaceAll("(", "(guid'")
              .replaceAll(")", "')");
            var rt = "";
            var taht = this;
            oModel.read(sV2, {
              success: function (oData) {
                rt = oData.storage_ID;
                if (sAction === "OK") {
                  oModel.remove("/" + sV2.split("/")[2].replaceAll("storageSlot", "StorageSlot"), {
                    success: () => MessageToast.show("Deleted"),
                    error: () => MessageToast.show("Error!"),
                  });
                  console.log("rt " + rt);
                  taht.refresh()
                  taht.routing.navigateToRoute("StorageObjectPage", {key: rt});
                }
              },
              error: function () {},
            });
          },
        });
      },
    };
  }
);
