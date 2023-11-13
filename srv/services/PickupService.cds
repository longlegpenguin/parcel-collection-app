namespace com.sap.internal.digitallab.packagehandling.service;

using {com.sap.internal.digitallab.packagehandling.core as core} from '../../db/models/packagehandling/';

/**
 * Service definition
 */
@path: 'PickupService'
service PickupService {

    @readonly
    entity Package         as projection on core.Package {
        *,
        slot.name         as slotName,
        slot.storage.name as storageName
    }; //where recipient = $user;

    @readonly
    entity PackageType     as projection on core.PackageType;

    @readonly
    entity PackageStatus   as projection on core.PackageStatus;

    @readonly
    entity StorageSlot     as projection on core.StorageSlot {
        ID,
        name,
        storage.name as storageName
    };

    @readonly
    entity Storage         as projection on core.Storage {
        ID,
        name,
        locationInstructions
    };

    @readonly
    entity DeliveryCompany as projection on core.DeliveryCompany {
        ID,
        name
    };

    @sap.applicable.path: 'pickup_ac'
    action pickup(packageId : UUID) returns Package;
}
