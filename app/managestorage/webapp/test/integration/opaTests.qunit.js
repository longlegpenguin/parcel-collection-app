sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'packagehandling/app/storage/test/integration/FirstJourney',
		'packagehandling/app/storage/test/integration/pages/StorageList',
		'packagehandling/app/storage/test/integration/pages/StorageObjectPage',
		'packagehandling/app/storage/test/integration/pages/StorageSlotObjectPage'
    ],
    function(JourneyRunner, opaJourney, StorageList, StorageObjectPage, StorageSlotObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start test/flpSandbox.html?sap-ui-xx-viewCache=false#packagehandlingappstorage-tile in web folder
            launchUrl: sap.ui.require.toUrl('packagehandling/app/storage') + '/test/flpSandbox.html?sap-ui-xx-viewCache=false#packagehandlingappstorage-tile'
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