sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'packagehandling.app.storage',
            componentId: 'StorageList',
            contextPath: '/Storage'
        },
        CustomPageDefinitions
    );
});