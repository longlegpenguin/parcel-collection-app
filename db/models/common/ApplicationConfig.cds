namespace com.sap.internal.digitallab.packagehandling.common;

using {
    managed,
    cuid
} from '@sap/cds/common';

entity ApplicationConfig : cuid, managed {
    application : String(255) not null;
    key_ : String(255) not null;
    value : String(255) not null;
}