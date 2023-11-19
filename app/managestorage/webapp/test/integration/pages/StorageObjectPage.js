sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'packagehandling.app.storage',
            componentId: 'StorageObjectPage',
            contextPath: '/Storage'
        },
        CustomPageDefinitions
    );
});