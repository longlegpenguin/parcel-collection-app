sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend(
      "com.sap.internal.digitallab.packagehandling.app.pickuppackage.controller.Done",
      {
        onInit: function () {
          const sPath = sap.ui.require.toUrl(
            "com/sap/internal/digitallab/packagehandling/app/pickuppackage/images/image3.png"
          );
          const oModel = new JSONModel({ imagePath: sPath });
          this.getView().setModel(oModel, "view2");

          this._dic = {};
          this._locDic = {};

          var oView = this.getView();
          oView.addEventDelegate(
            {
              onAfterShow: (oEvent) => {
                this.getView().getModel().refresh();
                $.get({
                  url: "odata/v4/PickupService/Package",
                  success: (oData) => {
                    this.getView()
                      .getModel("packages")
                      .setProperty("/length", oData.value.length);
                  },
                  error: function (error) {
                    console.log("Error: " + JSON.stringify(error, null, 4));
                  },
                });
              },
            },
            oView
          );

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
              this._types = oData.value;
              oData.value.forEach((c) => {
                this._dic[c.code] = c.name;
              });
              console.log("Dic: " + JSON.stringify(this._dic, null, 4));
            },
            error: function (error) {
              console.log("Error: " + JSON.stringify(error, null, 4));
            },
          });

          $.get({
            url: "odata/v4/PickupService/StorageSlot",
            success: (oData) => {
              this._types = oData.value;
              oData.value.forEach((c) => {
                this._locDic[c.ID] = c.storageName + " | " + c.name;
              });
              console.log(
                "Location Dic: " + JSON.stringify(this._locDic, null, 4)
              );
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

          $.get({
            url: "odata/v4/PickupService/Package",
            success: (oData) => {
              this.getView()
                .getModel("packages")
                .setProperty("/length", oData.value.length);
            },
            error: function (error) {
              console.log("Error: " + JSON.stringify(error, null, 4));
            },
          });
        },

        loc_info: function (sId) {
          return this._locDic[sId];
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

        onCloseButtonPress: function (oEvent) {
          console.log("Closed");
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("overview");
        },
      }
    );
  }
);
