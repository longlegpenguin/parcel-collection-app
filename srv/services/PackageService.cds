namespace com.sap.internal.digitallab.packagehandling.service;

using {com.sap.internal.digitallab.packagehandling.core as core} from '../../db/models/packagehandling/';
using {com.sap.internal.digitallab.packagehandling.common as common} from '../../db/models/common/';

/**
 * Service definition
 */
@path: 'PackageService'
service PackageService {

    @(restrict: [{grant: [
        'READ',
        'UPDATE',
        'DELETE'
    ]}])
    entity Package         as projection on core.Package;

    @readonly
    entity PackageType     as projection on core.PackageType;

    @readonly
    entity PackageStatus   as projection on core.PackageStatus;

    @readonly
    entity StorageSlot     as projection on core.StorageSlot {
        ID,
        name,
        storage
    };

    @readonly
    entity Storage         as projection on core.Storage {
        ID,
        name,
        buildingFloor
    };

    @readonly
    entity DeliveryCompany as projection on core.DeliveryCompany {
        ID,
        name,
        logo
    };

    @readonly
    entity Building        as projection on common.Building {
        ID,
        name,
        floors
    };

    @readonly
    entity BuildingFloor   as projection on common.BuildingFloor {
        ID,
        name,
        building
    };

    @sap.applicable.path: 'confirm_ac'
    action confirm(packagesIds : many UUID, slotId : UUID) returns Boolean;

    @sap.applicable.path: 'pickup_ac'
    action pickup(packageId : UUID)                        returns Package;
}


/*
 * Input validation
 */
annotate PackageService.Package with {
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

annotate PackageService.Package with @(Capabilities.DeleteRestrictions.Deletable: delete_ac);
