sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/sap/internal/digitallab/packagehandling/app/pickuppackage/component/PkMBox",
    "sap/m/List",
    "sap/m/StandardListItem",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, JSONModel, PkMBox, List, StandardListItem) {
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

          this._dic = {};

          $.get({
            url: "odata/v4/PickupService/DeliveryCompany",
            success: (oData) => {
              console.log("Types: " + JSON.stringify(oData, null, 4));
              this._types = oData.value;
              oData.value.forEach((c) => {
                this._dic[c.ID] = c.name;
              });
              console.log("Type: " + JSON.stringify(this._types[0], null, 4));
              console.log("Dic: " + JSON.stringify(this._dic, null, 4));
            },
            error: function (error) {
              console.log("Error: " + JSON.stringify(error, null, 4));
            },
          });

          $.get({
            url: "odata/v4/PickupService/PackageType",
            success: (oData) => {
              console.log("Types: " + JSON.stringify(oData, null, 4));
              this._types = oData.value;
              oData.value.forEach((c) => {
                this._dic[c.code] = c.name;
              });
              console.log("Type: " + JSON.stringify(this._types[0], null, 4));
              console.log("Dic: " + JSON.stringify(this._dic, null, 4));
            },
            error: function (error) {
              console.log("Error: " + JSON.stringify(error, null, 4));
            },
          });
        },

        onBeforeRendering: function () {
          console.log("Here I am");
          var oUser = sap.ushell.Container.getUser();
          var sCurrentUser = oUser.getId();
          var oLocalModel = this.getView().getModel("usr");
          oLocalModel.setProperty("/uname", sCurrentUser);
          console.log("?????");

          $.get({
            url: "odata/v4/PickupService/Package",
            success: (oData) => {
              console.log("Data: " + JSON.stringify(oData, null, 4));
              console.log();
              this.getView()
                .getModel("packages")
                .setProperty("/length", oData.value.length);
            },
            error: function (error) {
              console.log("Error: " + JSON.stringify(error, null, 4));
            },
          });
        },

        setHeaderContext: function () {
          var oView = this.getView();

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
          console.log("cnt: " + cnt);

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

        type_name: function (type_code) {
          console.log(this._dic[type_code]);
          return this._dic[type_code];
        },

        company_name: function (id) {
          return this._dic[id];
        },

        onPackageListSelectionChange: function (oEvent) {},
      }
    );
  }
);
