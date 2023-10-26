package com.sap.internal.digitallab.packagehandling.repository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class DeliveryCompanyRepositoryTest {
    private final DeliveryCompanyRepository repo;

    @Autowired
    DeliveryCompanyRepositoryTest(DeliveryCompanyRepository repo) {
        this.repo = repo;
    }

    @Test
    void testSelectById() {
        Assertions.assertEquals(1, repo.selectById("6480a902-007c-4cdd-a6a3-0f3a88d24fe0").stream().count());
    }
}