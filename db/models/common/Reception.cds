namespace com.sap.internal.digitallab.packagehandling.common;

using {
    managed,
    cuid
} from '@sap/cds/common';
using { 
    com.sap.internal.digitallab.packagehandling.common.Building, 
    com.sap.internal.digitallab.packagehandling.common.FloorType 
} from '.';

entity Reception : cuid, managed {
    building : Association to one Building not null;
    name : String(255) not null;
    locationDesc : String(1000);
    phoneNumber : String(255);
    openMon : String(5);
    openTue : String(5);
    openWed : String(5);
    openThu : String(5);
    openFri : String(5);
    openSat : String(5);
    openSun : String(5);
    openHol : String(5);
    
}