sap.ui.define(["sap/fe/core/AppComponent"], function (Component) {
  "use strict";

  return Component.extend(
    "com.sap.internal.digitallab.packagehandling.app.manage.package.Component",
    {
      metadata: {
        manifest: "json",
      },
      init: function () {
        Component.prototype.init.apply(this, arguments);

        this._dic = {};
        this._readPacks();
        this.setModel(this._dic, "cache");
      },

      _readPacks: function () {
        $.get({
          url: "odata/v4/PackageService/Package",
          success: (oData) => {
            oData.value.forEach((elem) => {
              this._dic[elem.ID] = {};
              this._dic[elem.ID]["confirmable"] = elem.confirm_ac;
              this._dic[elem.ID]["pickable"] = elem.pickup_ac;
            });
          },
          error: function (error) {
            console.log("Error: " + JSON.stringify(error, null, 4));
          },
        });
      },
    }
  );
});
