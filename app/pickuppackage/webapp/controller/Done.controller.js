sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend(
      "com.sap.internal.digitallab.packagehandling.app.pickuppackage.controller.Done",
      {
        /**
         * On init, read and cached useful data from back-end 
         * into local models and dictionaries.
         */
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
              this._types = oData.value;
              oData.value.forEach((c) => {
                this._dic[c.ID] = c.name;
              });
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
            },
            error: function (error) {
              console.log("Error: " + JSON.stringify(error, null, 4));
            },
          });
        },

        /**
         * Before rendering, loads the current user info into local model.
         */
        onBeforeRendering: function () {
          var oUser = sap.ushell.Container.getUser();
          var sCurrentUser = oUser.getId();
          var oLocalModel = this.getView().getModel("usr");
          oLocalModel.setProperty("/uname", sCurrentUser);
        },

        /**
         * Formatter for the location field.
         * @param {String} sId id of the storage or the slot.
         * @returns the name of the storage or the slot.
         */
        loc_info: function (sId) {
          return this._locDic[sId];
        },

        /**
         * Formatter for the hidden of package list.
         * @param {Integer} cnt count of package. 
         * @returns true if count equals zero, otherwise false.
         */
        eq0: function (cnt) {
          return cnt == 0;
        },

        /**
         * Formatter for the unhidden of package list.
         * @param {Integer} cnt count of package. 
         * @returns true if count greater than zero, otherwise false.
         */
        gt0: function (cnt) {
          return cnt > 0;
        },

        /**
         * Formatter for the package type field's icon.
         * @param {String} type_code package type code
         * @returns package type icon url.
         */
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

        /**
         * Formatter for the package type field.
         * @param {String} type_code package type code
         * @returns package type name.
         */
        type_name: function (type_code) {
          return this._dic[type_code];
        },

        /**
         * Formatter for the delivery company field.
         * @param {String} id id of the delivery company.
         * @returns name of the delivery company.
         */
        company_name: function (id) {
          return this._dic[id];
        },

        /**
         * On close button clicked, navigate back to the overview page.
         * @param {Object} oEvent 
         */
        onCloseButtonPress: function (oEvent) {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("overview");
        },
      }
    );
  }
);
