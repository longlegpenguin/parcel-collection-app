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
        Assertions.assertEquals(1, repo.selectById("69bc3a65-e4e2-4235-864a-96ef2096b5c7").stream().count());
    }
}