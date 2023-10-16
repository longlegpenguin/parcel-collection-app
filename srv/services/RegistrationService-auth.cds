namespace com.sap.internal.digitallab.packagehandling.service;

using com.sap.internal.digitallab.packagehandling.service.RegistrationService from '.';

annotate RegistrationService with @(requires: [
    'FacilityManager',
    'Administrator',
    'Receptionist'
]);