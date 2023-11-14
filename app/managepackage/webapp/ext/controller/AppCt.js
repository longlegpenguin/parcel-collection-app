sap.ui.define(
  [
    "sap/ui/base/ManagedObject",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "com/sap/internal/digitallab/packagehandling/app/manage/package/ext/component/ConfirmDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/package/ext/component/EditDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/package/ext/component/PkMBox",
  ],
  function (
    ManagedObject,
    MessageBox,
    MessageToast,
    ConfirmDlg,
    EditDlg,
    PkMBox
  ) {
    "use strict";

    function _loadConfirmDlg(oExtensionAPI, aSelectedContexts) {
      new ConfirmDlg(oExtensionAPI, aSelectedContexts).load();
    }

    function _loadPickUpDlg(oExtensionAPI, oBindingContext, aSelectedContexts) {
      new PkMBox(oExtensionAPI).onPickUpPress(
        oBindingContext,
        aSelectedContexts
      );
    }

    function _loadEditDlg(oExtensionAPI, aSelectedContexts) {
      new EditDlg(oExtensionAPI, aSelectedContexts).load();
    }

    function _checkConfirmable(ctx, oModel) {
      return oModel[getRaw(ctx)].confirmable;
    }

    function _checkPickable(ctx, oModel) {
      return oModel[getRaw(ctx)].pickable;
    }

    function getRaw(ctx) {
      return ctx.replaceAll("/Package(", "").replaceAll(")", "");
    }

    return {
      showConfirmDlg: function (oBindingContext, aSelectedContexts) {
        if (aSelectedContexts == undefined || aSelectedContexts.length == 0) {
          MessageBox.warning("Please select at least one package to confirm.");
        } else {
          _loadConfirmDlg(this, aSelectedContexts);
        }
      },

      showPickUpMBox: function (oBindingContext, aSelectedContexts) {
        if (aSelectedContexts == undefined || aSelectedContexts.length !== 1) {
          MessageBox.warning("Please select exactly one package to pickup.");
        } else {
          _loadPickUpDlg(this, oBindingContext, aSelectedContexts);
        }
      },

      showEditDlg: function (oBindingContext, aSelectedContexts) {
        _loadEditDlg(this, aSelectedContexts);
      },

      enabledForSingleSelect: function (oBindingContext, aSelectedContexts) {
        if (aSelectedContexts && aSelectedContexts.length === 1) {
          return _checkPickable(
            aSelectedContexts[0].sPath,
            this._view.getModel("cache")
          );
        }
        return false;
      },

      enabledForSelect: function (oBindingContext, aSelectedContexts) {
        if (aSelectedContexts && aSelectedContexts.length >= 1) {
          return _checkConfirmable(
            aSelectedContexts[0].sPath,
            this._view.getModel("cache")
          );
        }
        return false;
      },
    };
  }
);
