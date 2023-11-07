using com.sap.internal.digitallab.packagehandling.service.PackageService as service from '../../../srv/services/PackageService';

annotate service.StorageSlot with {
    name    @title: 'Slot';
    storage @title: 'Storage';
    ID      @title: 'UUID';
};

annotate service.Storage with {
    name          @title: 'Name';
    buildingFloor @title: 'Building Floor';
    ID            @title: 'UUID';
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
};


annotate service.Building with {
    name   @title: 'Name';
    floors @title: 'Floors';
    ID     @title: 'UUID';
};

annotate service.BuildingFloor with {
    name     @title: 'Name';
    building @title: 'Building';
    ID       @title: 'UUID';
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
    name @title: 'Delivery Company';
    logo @title: 'Logo';
    ID   @title: 'UUID';
};
