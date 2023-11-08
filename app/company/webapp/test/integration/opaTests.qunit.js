sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ph/app/company/company/test/integration/FirstJourney',
		'ph/app/company/company/test/integration/pages/DeliveryCompanyList',
		'ph/app/company/company/test/integration/pages/DeliveryCompanyObjectPage'
    ],
    function(JourneyRunner, opaJourney, DeliveryCompanyList, DeliveryCompanyObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start test/flpSandbox.html?sap-ui-xx-viewCache=false#phappcompanycompany-tile in web folder
            launchUrl: sap.ui.require.toUrl('ph/app/company/company') + '/test/flpSandbox.html?sap-ui-xx-viewCache=false#phappcompanycompany-tile'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDeliveryCompanyList: DeliveryCompanyList,
					onTheDeliveryCompanyObjectPage: DeliveryCompanyObjectPage
                }
            },
            opaJourney.run
        );
    }
);