namespace com.sap.internal.digitallab.packagehandling.core;
using {
    managed,
    cuid,
    User
} from '@sap/cds/common';

using { 
    com.sap.internal.digitallab.packagehandling.core.StorageSlot,
    com.sap.internal.digitallab.packagehandling.core.DeliveryCompany,
    com.sap.internal.digitallab.packagehandling.core.PackageType,
    com.sap.internal.digitallab.packagehandling.core.PackageStatus
} from '.';

entity Package : cuid, managed {
    recipient : User not null;
    comfirmationTime : Timestamp;
    pickupTime : Timestamp;
    slot : Association to one StorageSlot;
    deliveryCompany : Association to one DeliveryCompany;
    type : Association to one PackageType not null;
    status : Association to one PackageStatus not null;
    receptionist : User not null;
    comment : String(255);
}