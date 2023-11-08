sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.sap.internal.digitallab.packagehandling.app.manage.package',
            componentId: 'PackageObjectPage',
            contextPath: '/Package'
        },
        CustomPageDefinitions
    );
});