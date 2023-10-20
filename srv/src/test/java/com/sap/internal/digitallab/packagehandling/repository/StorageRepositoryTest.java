package com.sap.internal.digitallab.packagehandling.repository;

import com.sap.cds.Result;
import com.sap.cds.Row;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class StorageRepositoryTest {

    private final StorageRepository repo;
    private final String storageUsed = "92a5f984-7c3b-4a36-9883-4f7edba1d9f3";

    @Autowired
    StorageRepositoryTest(StorageRepository repo) {
        this.repo = repo;
    }

    @Test
    void selectSlotsById() {
        Result result = repo.selectSlotsById(storageUsed);
        Assertions.assertEquals(12, result.stream().count());
    }

    @Test
    void selectById() {
        Row result = repo.selectById(storageUsed);
        Assertions.assertNotNull(result);
        Assertions.assertThrows(Exception.class, () -> repo.selectById(""));
    }
}