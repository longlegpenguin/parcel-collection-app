namespace com.sap.internal.digitallab.packagehandling.common;

using { sap } from '@sap/cds/common';

entity FloorType : sap.common.CodeList {
    key code : String(255) not null;
}