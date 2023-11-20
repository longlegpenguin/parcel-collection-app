sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'ph.app.company.company',
            componentId: 'DeliveryCompanyList',
            contextPath: '/DeliveryCompany'
        },
        CustomPageDefinitions
    );
});