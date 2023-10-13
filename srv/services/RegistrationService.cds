namespace com.sap.internal.digitallab.packagehandling.service;

using {com.sap.internal.digitallab.packagehandling.core as core} from '../../db/models/packagehandling/';
using {com.sap.internal.digitallab.packagehandling.common as common} from '../../db/models/common/';

/**
 * Service definition
 */
@path: 'RegistrationService'
service RegistrationService {

    entity Package         as projection on core.Package;

    @readonly
    entity PackageType     as projection on core.PackageType;

    @readonly
    entity PackageStatus   as projection on core.PackageStatus;

    @readonly
    entity DeliveryCompany as projection on core.DeliveryCompany {
        ID,
        name
    };

}

/**
 * Input validation
 */
annotate RegistrationService.Package with {
    recipient     @mandatory;
    type          @mandatory  @assert.target;
    receptionist  @mandatory  @(restrict: [
        {
            grant: 'READ',
            to   : 'Receptionist',
        },
        {
            grant: '*',
            to   : [
                'Administrator',
                'FacilityManager'
            ]
        },
    ]);
};
