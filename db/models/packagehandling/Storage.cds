namespace com.sap.internal.digitallab.packagehandling.core;

using {
    managed,
    cuid
} from '@sap/cds/common';
using { com.sap.internal.digitallab.packagehandling.core.Package } from './Package.cds';
using { com.sap.internal.digitallab.packagehandling.core.StorageSlot } from './StorageSlot.cds';

entity Storage : cuid, managed {
    name : localized String(255) not null;
    buildingFloor : UUID not null;
    locationInstructions : localized String(1000);
    map : localized String(255);
    totalPackages : Integer;
    currentPackages: Integer;
    // ? storageSlot : Composition of many StorageSlot on storageSlot.storage = $self;
    packages : Association to many Package;
}
