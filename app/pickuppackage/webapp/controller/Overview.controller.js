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
        /**
         * On init, read and cached useful data from back-end 
         * into local models and dictionaries.
         */
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

        onAfterRendering: function () {
          this.getView().byId("idPickupButton").setEnabled(false);
        },

        /**
         * Handles the event when user toggle the package list.
         * Selects all packages or deselectes all.
         * @param {Object} oEvent 
         */
        onToggleAllCheckBoxSelect: function (oEvent) {
          var yes = oEvent.getSource().getSelected();
          var oList = this._getList();
          yes ? oList.selectAll() : oList.removeSelections(true);
          this._resetBtnEnablement();
        },

        /**
         * Handles event when user click the pickup button.
         * Sends pickup request for all selected packages.
         * @param {Object} oEvent 
         */
        onPickupButtonPress: function (oEvent) {
          var items = this._getListItems();
          var aPaths = items.map(
            (item) => item.oBindingContexts.undefined.sPath
          );
          this._pickupAll(aPaths);
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
         * Handles in case the user changes the selection,
         * the pickup button enablement is updated.
         * @param {Object} oEvent 
         */
        onPackageListSelectionChange: function (oEvent) {
          this._resetBtnEnablement();
        },

        /**
         * Formatter for the location field.
         * @param {String} sId id of the storage or the slot.
         * @returns the name of the storage or the slot.
         */
        loc_info: function (sId) {
          return this._locDic[sId];
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

        _pickupAll: function (aPaths) {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          new PkMBox(this.getView().getModel(), oRouter).onPickUpPress(aPaths);
        },
      }
    );
  }
);
