namespace com.sap.internal.digitallab.packagehandling.core;

using {
    managed,
    cuid
} from '@sap/cds/common';
using { com.sap.internal.digitallab.packagehandling.core.Storage } from './Storage.cds';
using { com.sap.internal.digitallab.packagehandling.core.SlotStatus } from './SlotStatus.cds';
using { com.sap.internal.digitallab.packagehandling.core.Package } from './Package.cds';

entity StorageSlot : cuid, managed {
    name : localized String(255) not null;
    storage : Association to one Storage not null;
    status : Association to one SlotStatus not null;
    totalPackages : Integer;
    packages : Association to many Package on packages.slot = $self;
}