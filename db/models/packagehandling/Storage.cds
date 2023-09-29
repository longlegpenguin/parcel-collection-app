namespace com.sap.internal.digitallab.packagehandling.core;

using {
    managed,
    cuid
} from '@sap/cds/common';
using {com.sap.internal.digitallab.packagehandling.core.Package} from './Package.cds';
using {com.sap.internal.digitallab.packagehandling.core.StorageSlot} from './StorageSlot.cds';

entity Storage : cuid, managed {
    name                    : String(255) not null;
    buildingFloor           : UUID not null;
    locationInstructions    : String(1000);
    map                     : String(255);
    storageSlot             : Composition of many StorageSlot
                                  on storageSlot.storage = $self;
    virtual totalPackages   : Integer;
    virtual currentPackages : Integer;
    virtual delete_ac       : Boolean;
    virtual update_ac       : Boolean;
}
