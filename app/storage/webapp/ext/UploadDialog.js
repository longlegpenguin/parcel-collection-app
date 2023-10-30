sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/base/ManagedObject",
  ],
  function (
    Controller,
    MessageBox,
    MessageToast,
    ManagedObject
  ) {
    "use strict";

    return ManagedObject.extend(
      "packagehandling.app.storage.ext.UploadDialog",
      {
        constructor: function (oExtensionAPI) {
          this._oExtensionAPI = oExtensionAPI;
        },
        onBeforeOpen: function (oEvent) {
          this.oUploadDialog = oEvent.getSource();
          this._oExtensionAPI.addDependent(this.oUploadDialog);
        },

        onAfterClose: function (oEvent) {
          this._oExtensionAPI.removeDependent(this.oUploadDialog);
          this.oUploadDialog.destroy();
          this.oUploadDialog = undefined;
        },

        onOk: function (oEvent) {
          this._setDialogBusy(true);

          var oFileUploader = byId("uploader");

          oFileUploader
            .checkFileReadable()
            .then(function () {
              oFileUploader.upload();
            })
            .catch(function (error) {
              showError("The file cannot be read.");
              setDialogBusy(false);
            });
        },

        onCancel: function (oEvent) {
          this._closeDialog();
        },

        onTypeMismatch: function (oEvent) {
          var sSupportedFileTypes = oEvent
            .getSource()
            .getFileType()
            .map(function (sFileType) {
              return "*." + sFileType;
            })
            .join(", ");

          showError(
            "The file type *." +
              oEvent.getParameter("fileType") +
              " is not supported. Choose one of the following types: " +
              sSupportedFileTypes
          );
        },

        onFileAllowed: function (oEvent) {
          this._setOkButtonEnabled(true);
        },

        onFileEmpty: function (oEvent) {
          this._setOkButtonEnabled(false);
        },

        onUploadComplete: function (oEvent) {
          var iStatus = oEvent.getParameter("status");
          var oFileUploader = oEvent.getSource();

          oFileUploader.clear();
          this._setOkButtonEnabled(false);
          this._setDialogBusy(false);

          if (iStatus >= 400) {
            var oRawResponse = JSON.parse(oEvent.getParameter("responseRaw"));
            showError(
              oRawResponse && oRawResponse.error && oRawResponse.error.message
            );
          } else {
            MessageToast.show("Uploaded successfully");
            this._oExtensionAPI.refresh();
            this._closeDialog();
          }
        },
        _setOkButtonEnabled: function (bOk) {
          this.oUploadDialog &&
            this.oUploadDialog.getBeginButton().setEnabled(bOk);
        },

        _setDialogBusy: function (bBusy) {
          this.oUploadDialog.setBusy(bBusy);
        },

        _closeDialog: function () {
          this.oUploadDialog && this.oUploadDialog.close();
        },

        _showError: function (sMessage) {
          MessageBox.error(sMessage || "Upload failed");
        },

        // TODO: Better option for this?
        _byId: function (sId) {
          return sap.ui.core.Fragment.byId("uploadDialog", sId);
        },
      }
    );
  }
);
