sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("ph.app.registration.controller.App", {
        onInit: function() {
          console.log("App COntroller");
          console.log(this.getView());
          console.log("Owner Component: " + this.getOwnerComponent);
          console.log("model: " + this.getView().getModel());
          console.log("device model" + this.getView().getModel("device"));
        },

        onSaveButtonPress: function (oEvent) {
          var sRecipient = this.getView().getModel("data").getProperty("data/recipient");
          console.log(sRecipient + "recived");
          this._getInputs();
        },
      });
    }
  );
  