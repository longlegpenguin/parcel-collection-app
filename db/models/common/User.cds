namespace com.sap.internal.digitallab.packagehandling.common;

using {
    managed,
    cuid
} from '@sap/cds/common';

entity User : cuid, managed {
    sapId       : String(12) not null;
    firstName   : String(255) not null;
    lastName    : String(255) not null;
    mailAddress : String(255) not null;
    phoneNumber : String(255);
    fullName : String = firstName || ' ' || lastName;
}
