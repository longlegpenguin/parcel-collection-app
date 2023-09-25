namespace com.sap.internal.digitallab.packagehandling.core;

using {
    managed,
    cuid
} from '@sap/cds/common';
using { com.sap.internal.digitallab.packagehandling.core.Package } from './Package.cds';

entity DeliveryCompany : cuid, managed {
    name : String(255) not null;
    logo : String(255) @Core.IsURL @Core.IsMediaType;
    packages : Association to many Package 
        on packages.deliveryCompany = $self;
}