namespace com.sap.internal.digitallab.packagehandling.common;

using {
    managed,
    cuid
} from '@sap/cds/common';
using { 
    com.sap.internal.digitallab.packagehandling.common.Building, 
    com.sap.internal.digitallab.packagehandling.common.FloorType 
} from '.';


entity BuildingFloor : cuid, managed {
    name : String(255) not null;
    building : Association to one Building not null;
    type : Association to one FloorType not null;
    map : String(255);
}