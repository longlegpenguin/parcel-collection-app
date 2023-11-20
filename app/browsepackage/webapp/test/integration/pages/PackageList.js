sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.sap.internal.digitallab.packagehandling.app.list.history',
            componentId: 'PackageList',
            contextPath: '/Package'
        },
        CustomPageDefinitions
    );
});