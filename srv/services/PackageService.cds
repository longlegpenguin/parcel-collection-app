namespace com.sap.internal.digitallab.packagehandling.service;

using {com.sap.internal.digitallab.packagehandling.core as core} from '../../db/models/packagehandling/';
using {com.sap.internal.digitallab.packagehandling.common as common} from '../../db/models/common/';

/**
 * Service definition
 */
@path: 'PackageService'
service PackageService {

    entity Package         as projection on core.Package;
    entity PackageType     as projection on core.PackageType;
    entity PackageStatus   as projection on core.PackageStatus;

    entity StorageSlot     as projection on core.StorageSlot {
        ID,
        name,
        storage
    };

    entity Storage         as projection on core.Storage {
        ID,
        name,
        buildingFloor
    };

    entity DeliveryCompany as projection on core.DeliveryCompany {
        ID,
        name
    };

    entity Building        as projection on common.Building {
        ID,
        name,
        floors
    };

    entity BuildingFloor   as projection on common.BuildingFloor {
        ID,
        name,
        building
    };

}
