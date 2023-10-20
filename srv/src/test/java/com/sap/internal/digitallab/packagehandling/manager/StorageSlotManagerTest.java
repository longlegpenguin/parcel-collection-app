package com.sap.internal.digitallab.packagehandling.manager;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
class StorageSlotManagerTest {

    private final StorageSlotManager slotMgr;
    private final String storageWithoutSlots = "2F33D046-13A8-442C-AEBC-5A687891BE7E";
    private final String storageWithSlots = "92A5F984-7C3B-4A36-9883-4F7EDBA1D9F3";
    private final String slotInUse = "187EAB04-8339-4936-8300-F0BF83104216";
    private final String slotEmpty = "16855732-136F-4C24-9DCE-47650F7D51B0";


    @Autowired
    StorageSlotManagerTest(StorageSlotManager slotMgr) {
        this.slotMgr = slotMgr;
    }

    @Test
    void testMassCreateNoDupExistingStorage() {
        int cnt = slotMgr.massCreate("C", 3, "N", 4, storageWithoutSlots);
        Assertions.assertEquals(cnt, 12);
    }

    @Test
    void testMassCreateHasDupExistingStorage() {
        int cnt = slotMgr.massCreate("C", 3, "N", 4, storageWithSlots);
        Assertions.assertEquals(cnt, 10);
    }

    @Test
    void testMassCreateInvalidParameters() {
        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            slotMgr.massCreate("N", 3, "N", 4, storageWithSlots);
        });
        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            slotMgr.massCreate("F", 3, "N", 4, storageWithSlots);
        });
        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            slotMgr.massCreate("N", 3, "F", 4, storageWithSlots);
        });
    }
}