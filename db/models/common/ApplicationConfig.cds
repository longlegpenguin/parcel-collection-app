namespace com.sap.internal.digitallab.packagehandling.common;

using {
    managed,
    cuid
} from '@sap/cds/common';

entity ApplicationConfig : cuid, managed {
    application : String(255) not null;
    confkey        : String(255) not null;
    confvalue       : String(255) not null;
}
