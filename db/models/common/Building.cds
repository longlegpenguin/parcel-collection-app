namespace com.sap.internal.digitallab.packagehandling.common;

using {
    managed,
    cuid
} from '@sap/cds/common';
using { 
    com.sap.internal.digitallab.packagehandling.common.Reception, 
    com.sap.internal.digitallab.packagehandling.common.BuildingFloor 
} from '.';


entity Building : cuid, managed {
    name : String(255) not null;
    address : String(255);
    coordinates : String(255);
    phoneNumber : String(255);
    map : String(255);
    receptions : Association to many Reception
        on receptions.building = $self;
    floors : Association to many BuildingFloor
        on floors.building = $self;
}