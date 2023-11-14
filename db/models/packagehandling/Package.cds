namespace com.sap.internal.digitallab.packagehandling.core;

using {
    managed,
    cuid,
// User
} from '@sap/cds/common';

using {
    com.sap.internal.digitallab.packagehandling.core.StorageSlot,
    com.sap.internal.digitallab.packagehandling.core.DeliveryCompany,
    com.sap.internal.digitallab.packagehandling.core.PackageType,
    com.sap.internal.digitallab.packagehandling.core.PackageStatus
} from '.';

using {
    com.sap.internal.digitallab.packagehandling.common.User,
    com.sap.internal.digitallab.packagehandling.common.Receptionist
} from '../common';

entity Package : cuid, managed {
    recipient          : Association to one User not null;
    comfirmationTime   : Timestamp;
    pickupTime         : Timestamp;
    slot               : Association to one StorageSlot;
    deliveryCompany    : Association to one DeliveryCompany;
    type               : Association to one PackageType not null;
    status             : Association to one PackageStatus not null;
    receptionist       : Association to one Receptionist not null;
    comment            : String(255);
    virtual delete_ac  : Boolean;
    virtual confirm_ac : Boolean;
    virtual pickup_ac  : Boolean;
    dc                 : String = deliveryCompany.name;
    bf                 : String = slot.storage.buildingFloor.name;
    recepId            : String = receptionist.user.sapId;
    storageName        : String = slot.storage.name;
    typeName           : String = type.name;
}
