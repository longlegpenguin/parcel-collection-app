sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/sap/internal/digitallab/packagehandling/app/pickuppackage/component/PkMBox",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, JSONModel, PkMBox) {
    "use strict";
    function _parseElem(elem) {
      return elem.replaceAll("(", ")").split(")")[1];
    }

    return BaseController.extend(
      "com.sap.internal.digitallab.packagehandling.app.pickuppackage.controller.Overview",
      {
        onInit: function () {
          const sPath = sap.ui.require.toUrl(
            "com/sap/internal/digitallab/packagehandling/app/pickuppackage/images/image2.png"
          );
          const oModel = new JSONModel({ imagePath: sPath });
          this.getView().setModel(oModel, "view");
        },

        onBeforeRendering: function () {
          console.log("Here I am");
          var oUser = sap.ushell.Container.getUser();
          var sCurrentUser = oUser.getId();
          var oLocalModel = this.getView().getModel("usr");
          oLocalModel.setProperty("/uname", sCurrentUser);
          console.log("?????");
          // this.setHeaderContext();
        },

        setHeaderContext: function () {
          var oView = this.getView();
          // var oContext = {
          //   path: "/Package",
          //   parameters: {
          //     $count: true,
          //   },
          // };
          var oContext = oView
            .byId("idPackageList")
            .getBinding("items")
            .getHeaderContext();
          oView.byId("idNoText").setBindingContext(oContext);
          oView.byId("idOkText").setBindingContext(oContext);
          oView.byId("idListPanel").setBindingContext(oContext);
        },

        onToggleAllCheckBoxSelect: function (oEvent) {
          var yes = oEvent.getSource().getSelected();
          var oList = this.getView().byId("idPackageList");
          yes ? oList.selectAll() : oList.removeSelections(true);
        },

        onPickupButtonPress: function (oEvent) {
          console.log("Lets's see");
          var oList = this.getView().byId("idPackageList");
          var items = oList.getSelectedItems();
          console.log(items[0].oBindingContexts.undefined.sPath);
          items.forEach((item) => {
            console.log("Picking up: " + item.oBindingContexts.undefined.sPath);
            this._pickup(item.oBindingContexts.undefined.sPath);
          });
        },

        _pickup: function (sPath) {
          //var oPkMBox =
          new PkMBox(this.getView().getModel()).onPickUpPress(sPath);
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

        onPackageListSelectionChange: function (oEvent) {},
      }
    );
  }
);
