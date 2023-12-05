sap.ui.define(
  [
    "sap/ui/core/mvc/ControllerExtension",
    "com/sap/internal/digitallab/packagehandling/app/manage/storages/ext/component/USlotDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/storages/ext/component/DSlotMBox",
  ],
  function (ControllerExtension, USlotDlg, DSlotMBox) {
    "use strict";

    function _loadUSlotDlg(oView, aSelectedContexts) {
      new USlotDlg(oView, aSelectedContexts).load();
    }

    return ControllerExtension.extend(
      "com.sap.internal.digitallab.packagehandling.app.manage.storages.ext.controller.ObjectPageExt",
      {
        /**
         * Displays and hand over the control to Edit Slot Dialog.
         * @param {Object} oEvent
         */
        onEditPress: function (oEvent) {
          var ctx = oEvent.getSource().getBindingContext();
          _loadUSlotDlg(this.getView(), ctx);
        },

        /**
         * Displays and hand over the control to Delete Slot Messagebox.
         * @param {Object} oEvent
         */
        onDeletePress: function (oEvent) {
          var ctx = oEvent.getSource().getBindingContext();
          DSlotMBox.onDeletePress(ctx, this.getView());
        },
      }
    );
  }
);
