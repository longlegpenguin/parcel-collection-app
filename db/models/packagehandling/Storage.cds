namespace com.sap.internal.digitallab.packagehandling.core;

using {
    managed,
    cuid
} from '@sap/cds/common';
using {com.sap.internal.digitallab.packagehandling.core.Package} from './Package.cds';
using {com.sap.internal.digitallab.packagehandling.core.StorageSlot} from './StorageSlot.cds';
using {com.sap.internal.digitallab.packagehandling.common.BuildingFloor} from '../common/BuildingFloor';

@assert.unique: {nbunique: [
    name,
    buildingFloor
]}
entity Storage : cuid, managed {
    name                    : String(255) not null;
    buildingFloor           : Association to one BuildingFloor not null;
    locationInstructions    : String(1000);
    map                     : String(255);
    storageSlot             : Composition of many StorageSlot
                                  on storageSlot.storage = $self;
    virtual totalPackages   : Integer;
    virtual currentPackages : Integer;
    virtual delete_ac       : Boolean;
    virtual update_ac       : Boolean;
    bf                      : String = buildingFloor.name;
    bd                      : String = buildingFloor.building.name;
}
