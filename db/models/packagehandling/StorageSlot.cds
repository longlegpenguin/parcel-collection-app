namespace com.sap.internal.digitallab.packagehandling.core;

using {
    managed,
    cuid
} from '@sap/cds/common';

using {
    com.sap.internal.digitallab.packagehandling.core.Storage,
    com.sap.internal.digitallab.packagehandling.core.SlotStatus,
    com.sap.internal.digitallab.packagehandling.core.Package
} from '.';

entity StorageSlot : cuid, managed {
    name                  : String(255) not null;
    storage               : Association to one Storage not null;
    status                : Association to one SlotStatus not null;
    packages              : Association to many Package
                                on packages.slot = $self;
    virtual totalPackages : Integer;
}
