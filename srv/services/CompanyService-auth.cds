namespace com.sap.internal.digitallab.packagehandling.service;

using com.sap.internal.digitallab.packagehandling.service.CompanyService from '.';

annotate CompanyService with @(requires: [
    'FacilityManager',
    'Administrator'
]);
