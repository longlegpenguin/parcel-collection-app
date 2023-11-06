using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../../srv/services/StorageService';

annotate service.Storage with {
    name                 @title: 'Name';
    buildingFloor        @title: 'Building Floor';
    locationInstructions @title: 'Location Instructions';
    map                  @title: 'Map';
    storageSlot          @title: 'Storage Slot';
    totalPackages        @title: 'Total Number of Packages';
    currentPackages      @title: 'Current Utilizations';
    delete_ac            @title: 'Delete Action Control';
    update_ac            @title: 'Update Action Control';
};

annotate service.Building with {
    name        @title: 'Name';
    address     @title: 'Address';
    coordinates @title: 'Coordinates';
    phoneNumber @title: 'Phone Number';
    map         @title: 'Map';
};

annotate service.BuildingFloor with {
    name     @title: 'Name';
    building @title: 'Building';
    map      @title: 'Map';
};

annotate service.SlotStatus with {
    name @title: 'Name';
    code @title: 'Code';
};

annotate service.StorageSlot with {
    name          @title: 'Name';
    storage       @title: 'Storage';
    status        @title: 'Status';
    packages      @title: 'Packages';
    totalPackages @title: 'Total Number of Packages';
    delete_ac     @title: 'Delete Action Control';
    update_ac     @title: 'Update Action Control';
};
