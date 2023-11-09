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

          this._selectedAll = false;
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
          oView
            .byId("idListPanel")
            .setBindingContext(
              oView.byId("idPackList").getBinding("items").getHeaderContext()
            );
        },

        onBoxClicked: function (oEvent) {
          var yes = oEvent.getSource().getSelected();
          var oList = this.getView().byId("idPackList");
          yes ? oList.selectAll(true) : oList.removeSelections(true);
        },

        onPickupButtonPress: function (oEvent) {
            console.log("Lets's see");
            var oList = this.getView().byId("idPackList");
            var items = oList.getSelectedItems()
            console.log(items[0].oBindingContexts.undefined.sPath);
        },

        eq0: function (cnt) {
          return cnt == 0;
        },

        gt0: function (cnt) {
          return cnt > 0;
        },

        icon: function (type_code) {
          if (type_code === "letter") {
            return "sap-icon://letter";
          } else if (type_code === "newspaper") {
            return "sap-icon://newspaper";
          } else if (type_code === "normal") {
            return "sap-icon://product";
          }
          return "sap-icon://error";
        },
      }
    );
  }
);
