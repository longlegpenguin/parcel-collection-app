namespace com.sap.internal.digitallab.packagehandling.core;

using { sap } from '@sap/cds/common';

// aspect sap.common.CodeList {
//   name  : localized String(111);
//   descr : localized String(1111);
// }

entity PackageStatus : sap.common.CodeList {
    key code : String(255) not null;
}