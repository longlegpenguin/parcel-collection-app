namespace com.sap.internal.digitallab.packagehandling.core;

using { sap } from '@sap/cds/common';

entity PackageType : sap.common.CodeList {
    key code : String(255) not null;
}