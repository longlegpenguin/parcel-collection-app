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
          this._locDic = {};

          var oView = this.getView();
          oView.addEventDelegate(
            {
              onAfterShow: (oEvent) => {
                this.getView().getModel().refresh();
                this.getView().getModel("packages").refresh();
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
                this.getView().byId("idPickupButton").setEnabled(false);
              },
            },
            oView
          );

          $.get({
            url: "odata/v4/PickupService/DeliveryCompany",
            success: (oData) => {
              oData.value.forEach((c) => {
                this._dic[c.ID] = c.name;
              });
              // console.log("Type: " + JSON.stringify(this._types[0], null, 4));
              // console.log("Dic: " + JSON.stringify(this._dic, null, 4));
            },
            error: function (error) {
              console.log("Error: " + JSON.stringify(error, null, 4));
            },
          });

          $.get({
            url: "odata/v4/PickupService/PackageType",
            success: (oData) => {
              oData.value.forEach((c) => {
                this._dic[c.code] = c.name;
              });
              // console.log("Dic: " + JSON.stringify(this._dic, null, 4));
            },
            error: function (error) {
              console.log("Error: " + JSON.stringify(error, null, 4));
            },
          });

          $.get({
            url: "odata/v4/PickupService/StorageSlot",
            success: (oData) => {
              oData.value.forEach((c) => {
                this._locDic[c.ID] = c.name + " | " + c.storageName;
              });
              // console.log(
              //   "Location Dic: " + JSON.stringify(this._locDic, null, 4)
              // );
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
        onAfterRendering: function () {
          this.getView().byId("idPickupButton").setEnabled(false);
          console.log("After Rendeing");
        },
        onToggleAllCheckBoxSelect: function (oEvent) {
          var yes = oEvent.getSource().getSelected();
          var oList = this._getList();
          yes ? oList.selectAll() : oList.removeSelections(true);
          this._resetBtnEnablement();
        },

        onPickupButtonPress: function (oEvent) {
          var items = this._getListItems();
          var aPaths = items.map(
            (item) => item.oBindingContexts.undefined.sPath
          );
          this._pickupAll(aPaths);
        },

        _pickupAll: function (aPaths) {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

          new PkMBox(this.getView().getModel(), oRouter).onPickUpPress(aPaths);
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

        onPackageListSelectionChange: function (oEvent) {
          this._resetBtnEnablement();
        },

        _resetBtnEnablement: function () {
          var items = this._getListItems();
          var btn = this.getView().byId("idPickupButton");
          if (items.length > 0) {
            btn.setEnabled(true);
          } else {
            btn.setEnabled(false);
          }
        },

        _getListItems: function () {
          return this._getList().getSelectedItems();
        },

        _getList: function () {
          return this.getView().byId("idPackageList");
        },
      }
    );
  }
);
