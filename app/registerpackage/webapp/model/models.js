sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
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
             * Creates local data model contains data entries 
             * for the package registration form.
             * @returns {JSONModel}
             */
            createLocalModel: function () {
                var oData = {
                    data: {
                        recipient_ID: "",
                        type: "normal",
                        company: null,
                        receptionist_ID: "",
                    },
                };
                var oModel = new JSONModel(oData);
                return oModel;
            }
        };
    });