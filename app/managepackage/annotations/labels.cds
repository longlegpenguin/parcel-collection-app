using com.sap.internal.digitallab.packagehandling.service.PackageService as service from '../../../srv/services/PackageService';

annotate service.StorageSlot with {
    name    @title: 'Slot';
    storage @title: 'Storage';
    ID      @title: 'UUID';
};

annotate service.Storage with {
    name          @title: 'Storage';
    buildingFloor @title: 'Building Floor';
    ID            @title: 'UUID';
};

annotate service.Package with {
    recipient        @title: 'Recipient'  @Common.Text: recipient.fullName  @Common.TextArrangement: #TextOnly;
    comfirmationTime @title: 'Confirmation Time';
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
};


annotate service.Building with {
    name   @title: 'Building';
    floors @title: 'Floors';
    ID     @title: 'UUID';
};

annotate service.BuildingFloor with {
    name     @title: 'Floor';
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


annotate service.User with {
    ID          @title: 'UUID';
    sapId       @title: 'I/C-Number';
    firstName   @title: 'First Name';
    lastName    @title: 'Last Name';
    mailAddress @title: 'E-mail';
    phoneNumber @title: 'Phone number';
    fullName    @title: 'Name';
};
