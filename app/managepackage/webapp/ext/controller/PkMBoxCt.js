sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";

    function dumb(that) {
      console.log(that);
    }

    function _parseElem(elem) {
      return elem.replaceAll("(", ")").split(")")[1];
    }

    function _getErrorMsg(oError) {
      return JSON.parse(oError.responseText).error.message.value;
    }

    return {
      onPickUpPress: function (oBindingContext, aSelectedContexts) {
        MessageBox.warning(
          "Pickup this package? \n\n A notification will be sent to the recipient and package process will be closed.",
          {
            title: "Pick Up",
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            emphasizedAction: MessageBox.Action.OK,
            onClose: (sAction) => {
              if (sAction === "OK") {
                var oModel = this._view.getModel();
                var ctx = _parseElem(aSelectedContexts[0].sPath);
                console.log(ctx);
                const oContext = oModel.bindContext("/pickup(...)");

                oContext
                  .setParameter("packageId", ctx)
                  .execute()
                  .then(
                    () => {
                      MessageToast.show("Package Picked Up!");
                      this._closeDialog();
                    },
                    (oError) => {
                      if (!oError.canceled)
                        MessageBox.alert(_getErrorMsg(oError), {
                          icon: MessageBox.Icon.ERROR,
                          title: "Error",
                        });
                    }
                  );
              }
            },
            error: function () {},
          }
        );
      },
    };
  }
);
