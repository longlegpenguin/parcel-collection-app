sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/Device"],
  /**
   * provide app-view type models (as in the first "V" in MVVC)
   *
   * @param {typeof sap.ui.model.json.JSONModel} JSONModel
   * @param {typeof sap.ui.Device} Device
   *
   * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
   */
  function (JSONModel, Device) {
    "use strict";

    return {
      createDeviceModel: function () {
        var oModel = new JSONModel(Device);
        oModel.setDefaultBindingMode("OneWay");
        return oModel;
      },

      /**
       * Creates json local model of logged in user.
       * @returns {Object} JSON model
       */
      createLocalUsrModel: function () {
        var oModel = new JSONModel({
          uname: "John"
        });
        return oModel;
      },

      /**
       * Creates json local model of packages count.
       * @returns {Object} JSON model
       */
      createLocalPackModel: function () {
        var oModel = new JSONModel({
          length: 0
        });
        return oModel;
      },
    };
  }
);
