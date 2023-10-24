package com.sap.internal.digitallab.packagehandling.repository;

import com.sap.cds.Result;
import com.sap.cds.Row;
import com.sap.internal.digitallab.packagehandling.IdsConstants;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class StorageRepositoryTest {

    private final StorageRepository repo;
    private final String storageEmpty = IdsConstants.storage2;

    @Autowired
    StorageRepositoryTest(StorageRepository repo) {
        this.repo = repo;
    }

    @Test
    void selectSlotsById() {
        Result result = repo.selectSlotsById(storageEmpty);
        Assertions.assertEquals(1, result.stream().count());
    }

    @Test
    void selectById() {
        Row result = repo.selectById(storageEmpty);
        Assertions.assertNotNull(result);
        Assertions.assertThrows(Exception.class, () -> repo.selectById(""));
    }
}