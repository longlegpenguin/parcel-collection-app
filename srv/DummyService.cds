using { com.sap.internal.digitallab.packagehandling as model } from '../db/models/packagehandling'; 

service DummyService { 
    entity Package as projection on model.core.Package;
    entity PackageType as projection on model.core.PackageType;
    entity DeliveryCompany as projection on model.core.DeliveryCompany;
    entity PackageStatus as projection on model.core.PackageStatus;
    entity StorageSlot as projection on model.core.StorageSlot;
    entity SlotStatus as projection on model.core.SlotStatus;
    entity Storage as projection on model.core.Storage;
    
}