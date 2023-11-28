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
    bd                   @title: 'Building';
    bf                   @title: 'Building Floor';
};

annotate service.Building with {
    name        @title: 'Building';
    address     @title: 'Address';
    coordinates @title: 'Coordinates';
    phoneNumber @title: 'Phone Number';
    map         @title: 'Map';
};

annotate service.BuildingFloor with {
    name     @title: 'Building Floor';
    building @title: 'Building';
    map      @title: 'Map';
};

annotate service.SlotStatus with {
    name @title: 'Slot Status';
    code @title: 'Code';
};

annotate service.StorageSlot with {
    name          @title: 'Storage Slot';
    storage       @title: 'Storage';
    status        @title: 'Status';
    packages      @title: 'Packages';
    totalPackages @title: 'Total Number of Packages';
    delete_ac     @title: 'Delete Action Control';
    update_ac     @title: 'Update Action Control';
};
