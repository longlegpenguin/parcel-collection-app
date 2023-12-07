sap.ui.define(
  [
    "sap/m/MessageBox",
    "com/sap/internal/digitallab/packagehandling/app/manage/package/ext/component/ConfirmDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/package/ext/component/EditDlg",
    "com/sap/internal/digitallab/packagehandling/app/manage/package/ext/component/PkMBox",
  ],
  function (
    MessageBox,
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
      /**
       * Displays the confirmation dialog.
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       */
      showConfirmDlg: function (oBindingContext, aSelectedContexts) {
        if (aSelectedContexts === undefined || aSelectedContexts.length === 0) {
          MessageBox.warning("Please select at least one package to confirm.");
        } else {
          _loadConfirmDlg(this, aSelectedContexts);
        }
      },

      /**
       * Displays the pickup dialog.
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       */
      showPickUpMBox: function (oBindingContext, aSelectedContexts) {
        if (aSelectedContexts == undefined || aSelectedContexts.length !== 1) {
          MessageBox.warning("Please select exactly one package to pickup.");
        } else {
          _loadPickUpDlg(this, oBindingContext, aSelectedContexts);
        }
      },

      /**
       * Displays the edit package dialog.
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       */
      showEditDlg: function (oBindingContext, aSelectedContexts) {
        _loadEditDlg(this, aSelectedContexts);
      },

      /**
       * 
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       * @returns true if only one package is selected and is pickable, otherwise, false.
       */
      enabledForSingleSelect: function (oBindingContext, aSelectedContexts) {
        if (aSelectedContexts && aSelectedContexts.length === 1) {
          return _checkPickable(
            aSelectedContexts[0].sPath,
            this._view.getModel("cache")
          );
        }
        return false;
      },

      /**
       * 
       * @param {Object} oBindingContext 
       * @param {Array} aSelectedContexts 
       * @returns true if at least one package is selected and the selected package are confirmable, otherwise, false.
       */
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
