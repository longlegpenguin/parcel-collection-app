sap.ui.define(
  ["sap/m/MessageBox", "sap/m/MessageToast"],
  function (MessageBox, MessageToast) {
    "use strict";

    return {
      /**
       * On press the delete button, 
       * delete request of the slot to the back-end if 'OK' is chosen.
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       */
      onDeletePress: function (oBindingContext, aSelectedContexts) {
        MessageBox.warning("Are you sure you want to delete this slot?", {
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          emphasizedAction: MessageBox.Action.OK,
          onClose: (sAction) => {
            var oModel = this._view.getModel("MyModel");
            var sV2 = aSelectedContexts[0].sPath
              .replaceAll("(", "(guid'")
              .replaceAll(")", "')");
            var storageId = "";
            var that = this;
            oModel.read(sV2, {
              success: function (oData) {
                storageId = oData.storage_ID;
                if (sAction === "OK") {
                  oModel.remove("/" + sV2.split("/")[2].replaceAll("storageSlot", "StorageSlot"), {
                    success: () => MessageToast.show("Deleted"),
                    error: () => MessageToast.show("Error!"),
                  });
                  that.refresh()
                  that.routing.navigateToRoute("StorageObjectPage", { key: storageId });
                }
              },
              error: function () { },
            });
          },
        });
      },
    };
  }
);
