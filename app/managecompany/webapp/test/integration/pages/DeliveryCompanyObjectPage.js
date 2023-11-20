sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'ph.app.company.company',
            componentId: 'DeliveryCompanyObjectPage',
            contextPath: '/DeliveryCompany'
        },
        CustomPageDefinitions
    );
});