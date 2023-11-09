sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend(
      "com.sap.internal.digitallab.packagehandling.app.pickuppackage.controller.Overview",
      {
        onInit: function () {
          const sPath = sap.ui.require.toUrl(
            "com/sap/internal/digitallab/packagehandling/app/pickuppackage/images/image2.png"
          );
          const oModel = new JSONModel({ imagePath: sPath });
          this.getView().setModel(oModel, "view");

          console.log("Overview Controller alive!");

          console.log("Me " + this.getView());
          console.log("Owner Component " + this.getOwnerComponent());
          console.log("model: " + this.getView().getModel());
          console.log("device model: " + this.getView().getModel("device"));
        },

        onBeforeRendering: function () {
          console.log("Here I am");
          var oUser = sap.ushell.Container.getUser();
          var sCurrentUser = oUser.getId();
          var oLocalModel = this.getView().getModel("usr");
          oLocalModel.setProperty("/uname", sCurrentUser);

          this.setHeaderContext();
        },

        setHeaderContext: function () {
          var oView = this.getView();
          oView
            .byId("idNoText")
            .setBindingContext(
              oView.byId("idPackList").getBinding("items").getHeaderContext()
            );
          oView
            .byId("idOkText")
            .setBindingContext(
              oView.byId("idPackList").getBinding("items").getHeaderContext()
            );
        },

        eq0: function (cnt) {
          return cnt == 0;
        },
        
        gt0: function (cnt) {
          return cnt > 0;
        },
      }
    );
  }
);
