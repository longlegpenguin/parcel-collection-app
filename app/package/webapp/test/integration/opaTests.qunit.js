sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/sap/internal/digitallab/packagehandling/app/manage/package/test/integration/FirstJourney',
		'com/sap/internal/digitallab/packagehandling/app/manage/package/test/integration/pages/PackageList',
		'com/sap/internal/digitallab/packagehandling/app/manage/package/test/integration/pages/PackageObjectPage'
    ],
    function(JourneyRunner, opaJourney, PackageList, PackageObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start test/flpSandbox.html?sap-ui-xx-viewCache=false#comsapinternaldigitallabpackag-tile in web folder
            launchUrl: sap.ui.require.toUrl('com/sap/internal/digitallab/packagehandling/app/manage/package') + '/test/flpSandbox.html?sap-ui-xx-viewCache=false#comsapinternaldigitallabpackag-tile'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePackageList: PackageList,
					onThePackageObjectPage: PackageObjectPage
                }
            },
            opaJourney.run
        );
    }
);