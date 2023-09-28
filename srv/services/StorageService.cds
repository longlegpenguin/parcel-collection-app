using { com.sap.internal.digitallab.packagehandling.core as core } 
from '../../db/models/packagehandling/';
using { com.sap.internal.digitallab.packagehandling.common as common } 
from '../../db/models/common/';

service StorageService {

    entity Storage as projection on core.Storage;
    entity StorageSlot as projection on core.StorageSlot;
    entity SlotStatus as projection on core.SlotStatus;
    entity Building as projection on common.Building;
    entity BuildingFloor as projection on common.BuildingFloor;

}