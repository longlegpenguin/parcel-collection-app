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
