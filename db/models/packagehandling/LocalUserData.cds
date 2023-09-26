namespace com.sap.internal.digitallab.packagehandling.core;

using {cuid} from '@sap/cds/common';

entity LocalUserData : cuid {
    sapId           : String(255);
    remoteId        : UUID;
    termsAccepted   : Boolean;
    termsAcceptedAt : Timestamp;
}
