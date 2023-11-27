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
      "com.sap.internal.digitallab.packagehandling.app.manage.package.ext.component.PkMBox",
      {
        constructor: function (oExtensionAPI) {
          this._oExtensionAPI = oExtensionAPI;
        },

        _updateCache: function (key) {
          var oModel = this._oExtensionAPI._view.getModel("cache");
          oModel[key].pickable = false;
          this._oExtensionAPI._view.setModel(oModel, "cache");
        },

        /**
         * Sends the pickup request to back-end if 'OK' is chosen by the user.
         * @param {Object} oBindingContext 
         * @param {Array} aSelectedContexts 
         */
        onPickUpPress: function (oBindingContext, aSelectedContexts) {
          MessageBox.warning(
            "Pickup this package? \n\n A notification will be sent to the recipient and package process will be closed.",
            {
              title: "Pick Up",
              actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
              emphasizedAction: MessageBox.Action.OK,
              onClose: (sAction) => {
                if (sAction === "OK") {
                  var oModel = this._oExtensionAPI.getModel();
                  var ctx = _parseElem(aSelectedContexts[0].sPath);
                  const oContext = oModel.bindContext("/pickup(...)");

                  oContext
                    .setParameter("packageId", ctx)
                    .execute()
                    .then(
                      () => {
                        MessageToast.show("Package Picked Up!");
                        this._updateCache(ctx);
                        this._oExtensionAPI.refresh();
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
      }
    );
  }
);
