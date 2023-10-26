package com.sap.internal.digitallab.packagehandling.repository;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.StorageSlot;
import com.sap.cds.Result;
import com.sap.internal.digitallab.packagehandling.IdsConstants;
import com.sap.internal.digitallab.packagehandling.manager.SlotStatusManager;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class StorageSlotRepositoryTest {
    private final StorageSlotRepository repo;
    private final SlotStatusManager mgr;
    private final String storageUsed = IdsConstants.storage1;
    private final String slotInUse = IdsConstants.slot2;


    @Autowired
    StorageSlotRepositoryTest(StorageSlotRepository repo, SlotStatusManager mgr) {
        this.repo = repo;
        this.mgr = mgr;
    }

    @Test
    void testInsert() {
        repo.insert("K - 1", mgr.emptySlotStatus(), storageUsed);
        Assertions.assertThrows(Exception.class, () -> repo.insert("A - 1", mgr.emptySlotStatus(), storageUsed));
    }

    @Test
    void selectNamesByStorageId() {
        Result result = repo.selectNamesByStorageId(storageUsed);
        Assertions.assertEquals(3, result.stream().count());
    }

    @Test
    void updateStatusCodeById() {
        repo.updateStatusCodeById("inuse", slotInUse);
        Result result = repo.selectById(slotInUse);
        Assertions.assertEquals("inuse", result.single().get(StorageSlot.STATUS_CODE));
    }

    @Test
    void selectById() {
        Result result = repo.selectById(slotInUse);
        Assertions.assertEquals(1, result.stream().count());
    }
}