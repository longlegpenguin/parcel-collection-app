package com.sap.internal.digitallab.packagehandling.manager;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.Storage;
import com.sap.internal.digitallab.packagehandling.repository.StorageRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class StorageManagerTest {
    private final StorageManager storageMgr;
    private final StorageRepository storageRepo;
    private final String storageUsed = "adf15060-9907-4ea3-be7e-db12a6277165";
    private final String storageUnUsed = "dd417962-aea2-4b65-8bda-1d987e5f7d2c";

    @Autowired
    StorageManagerTest(StorageManager storageMgr, StorageRepository storageRepo) {
        this.storageMgr = storageMgr;
        this.storageRepo = storageRepo;
    }

    @Test
    void testUpdateTotalPackageVf() {
        Storage storage = Storage.create();
        storage.putAll(storageRepo.selectById(storageUsed));
        storageMgr.updateTotalPackageVf(storage);
        Assertions.assertEquals(5, storage.getTotalPackages());
    }

    @Test
    void testUpdateConfirmedPackageVf() {
        Storage storage = Storage.create();
        storage.putAll(storageRepo.selectById(storageUsed));
        storageMgr.updateConfirmedPackageVf(storage);
        Assertions.assertEquals(1, storage.getCurrentPackages());
    }

    @Test
    void testUpdateDeleteAcWhenUsedFalse() {
        Storage storage = Storage.create();
        storage.putAll(storageRepo.selectById(storageUsed));
        storageMgr.updateDeleteAc(storage);
        Assertions.assertFalse(storage.getDeleteAc());
    }

    @Test
    void testUpdateDeleteAcWhenUnUsedTrue() {
        Storage storage = Storage.create();
        storage.putAll(storageRepo.selectById(storageUnUsed));
        storageMgr.updateDeleteAc(storage);
        Assertions.assertTrue(storage.getDeleteAc());
    }
}