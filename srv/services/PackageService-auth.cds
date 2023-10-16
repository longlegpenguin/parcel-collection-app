namespace com.sap.internal.digitallab.packagehandling.service;

using com.sap.internal.digitallab.packagehandling.service.PackageService from '.';

annotate PackageService with @(requires: [
    'FacilityManager',
    'Administrator',
    'Receptionist'
]);