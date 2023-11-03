sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController) {
    "use strict";

    return BaseController.extend(
      "ph.app.registration.controller.Registration",
      {
        onInit: function () {
          console.log("Registration Controller alive!");

          console.log("Me " + this.getView());
          console.log("Ov=wner Component " + this.getOwnerComponent());
          console.log("model: " + this.getView().getModel());
          console.log("device model: " + this.getView().getModel("device"));
        },

        onBeforeRendering: function () {
          console.log("Here I am");
          var oUser = sap.ushell.Container.getUser();
          var sCurrentUser = oUser.getId();
          this.getView().byId("idReceptionistInput").setValue(sCurrentUser);
        },

        onSaveButtonPress: function (oEvent) {
          var oData = this._getInputs();
          console.log(JSON.stringify(oData, null, 4));

          // TODO: POST

          // TODO: REDIRECT TO PACKAGE SERVICE
        },

        onSaveAndNewButtonPress: function (oEvent) {
          this.onSaveButtonPress(oEvent)
        },

        onDiscardButtonPress: function (oEvent) {
          // TODO reset all fields
        },

        _getInputs() {
          var oUser = sap.ushell.Container.getUser();
          var sCurrentUser = oUser.getId();
          var sRecipient = this.getView()
            .getModel("localData")
            .getProperty("/data/recipient");
          var tp = this.getView()
            .getModel("localData")
            .getProperty("/data/type");
          var dc = this.getView()
            .getModel("localData")
            .getProperty("/data/company");
          var cm = this.getView()
            .getModel("localData")
            .getProperty("/data/comment");
          return {
            recipient: sRecipient,
            type_code: tp,
            deliveryCompany_ID: dc,
            receptionist: sCurrentUser,
            comment: cm,
          };
        },
      }
    );
  }
);
