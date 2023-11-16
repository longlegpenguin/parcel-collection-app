using com.sap.internal.digitallab.packagehandling.service.HistoryService as service from '../../../srv/services/HistoryService';

annotate service.SlotStatus with {
    name @title: 'Slot Status';
    code @title: 'Code';
};

annotate service.StorageSlot with {
    name          @title: 'Slot';
    storage       @title: 'Storage';
    status        @title: 'Status';
    packages      @title: 'Packages';
    totalPackages @title: 'Total Number of Packages';
    delete_ac     @title: 'Delete Action Control';
    update_ac     @title: 'Update Action Control';
};

annotate service.Package with {
    recipient        @title: 'Recipient';
    comfirmationTime @title: 'Delivery Time';
    pickupTime       @title: 'Pickup Time';
    slot             @title: 'Slot';
    deliveryCompany  @title: 'Delivery Company';
    type             @title: 'Type';
    status           @title: 'Status';
    receptionist     @title: 'Receptionist';
    comment          @title: 'Comment';
    delete_ac        @title: 'Can Delete';
    confirm_ac       @title: 'Can Confirm';
    pickup_ac        @title: 'Can Pickup';
    ID               @title: 'UUID';
    createdAt        @title: 'Created On';
    createdBy        @title: 'Created By';
    modifiedAt       @title: 'Last Update On';
    modifiedBy       @title: 'Last Update By';
    storageName      @title: 'Storage';
    typeName         @title: 'Package Type';
    dc               @title: 'Delivery Company';
    recepId          @title: 'Receptionist';
    bf               @title: 'Building Floor';
    loc              @title: 'Location';
    statusName       @title: 'Package Status';
};

annotate service.PackageType with {
    name @title: 'Type';
    code @title: 'Type Code';
};

annotate service.PackageStatus with {
    name @title: 'Status';
    code @title: 'Status Code';
};

annotate service.DeliveryCompany with {
    name       @title: 'Delivery Company';
    logo       @title: 'Logo';
    packages   @title: 'Packages';
    createdAt  @title: 'Created On';
    createdBy  @title: 'Created By';
    modifiedAt @title: 'Last Update On';
    modifiedBy @title: 'Last Update By';
    ID         @title: 'UUID';
};
