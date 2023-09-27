namespace com.sap.internal.digitallab.packagehandling.common;

using {
    managed,
    cuid
} from '@sap/cds/common';
using {
    com.sap.internal.digitallab.packagehandling.common.Reception,
    com.sap.internal.digitallab.packagehandling.common.User
} from '.';


entity Receptionist : cuid, managed {
    user      : Association to one User not null;
    reception : Association to one Reception not null;
    guard     : Boolean;
}
