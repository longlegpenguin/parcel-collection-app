sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'storageui/test/integration/FirstJourney',
		'storageui/test/integration/pages/StorageList',
		'storageui/test/integration/pages/StorageObjectPage',
		'storageui/test/integration/pages/StorageSlotObjectPage'
    ],
    function(JourneyRunner, opaJourney, StorageList, StorageObjectPage, StorageSlotObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start test/flpSandbox.html?sap-ui-xx-viewCache=false#storageui-tile in web folder
            launchUrl: sap.ui.require.toUrl('storageui') + '/test/flpSandbox.html?sap-ui-xx-viewCache=false#storageui-tile'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheStorageList: StorageList,
					onTheStorageObjectPage: StorageObjectPage,
					onTheStorageSlotObjectPage: StorageSlotObjectPage
                }
            },
            opaJourney.run
        );
    }
);