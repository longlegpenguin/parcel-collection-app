sap.ui.define(
  ["sap/m/MessageBox", "sap/m/MessageToast"],
  function (MessageBox, MessageToast) {
    "use strict";

    return {
      /**
       * On press the delete button, display deletion messagebox.
       * delete request of the slot to the back-end if 'OK' is chosen.
       * @param {Object} oBindingContext the context of slot to be deleted.
       * @param {Array} oView the parent view from which the messagebox is called.
       */
      onDeletePress: function (oBindingContext, oView) {
        MessageBox.warning("Are you sure you want to delete this slot?", {
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          emphasizedAction: MessageBox.Action.OK,
          onClose: (sAction) => {
            if (sAction === "CANCEL") {
              return;
            }
            var oModel = oView.getModel("MyModel");
            var sV2 = oBindingContext.sPath
              .replaceAll("(", "(guid'")
              .replaceAll(")", "')")
              .split("/")[2]
              .replaceAll("storageSlot", "StorageSlot");

            oModel.remove("/" + sV2, {
              success: () => MessageToast.show("Deleted"),
              error: () => MessageToast.show("Error!"),
            });
            oView.getController().extensionAPI.refresh();
          },
        });
      },
    };
  }
);
