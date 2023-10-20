package com.sap.internal.digitallab.packagehandling.repository;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.persistence.PersistenceService;
import com.sap.internal.digitallab.packagehandling.IdsConstants;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class PackageRepositoryTest {

    private final PackageRepository repo;
    private final PersistenceService db;
    private final String slotInUse = IdsConstants.slot6;
    private final String slotInUse2 = IdsConstants.slot5;
    private final String slotEmpty = "8bcf0524-ce22-4f48-b8c2-4de29f9fe52d";
    private final String confirmedPack = "8fb3403b-1e14-43f5-9bb9-8b20113bb70a";

    @Autowired
    PackageRepositoryTest(PackageRepository repo, PersistenceService db) {
        this.repo = repo;
        this.db = db;
    }

    @Test
    void testReadBySlotId() {
        Assertions.assertEquals(0, repo.readBySlotId(slotEmpty).stream().count());
        Assertions.assertEquals(3, repo.readBySlotId(slotInUse).stream().count());
    }

    @Test
    void selectAllPackages() {
        repo.selectAllPackages();
    }

    @Test
    void removeDeliveryCompanyById() {
        repo.removeDeliveryCompanyById("724a082e-8f05-4d5e-bbc3-b8acaa30b8fb");
    }

    @Test
    void testReadById() {
        Assertions.assertEquals(1, repo.readById(confirmedPack).stream().count());
        Assertions.assertEquals(0, repo.readById("").stream().count());
    }

    @Test
    void updateSlotIdById() {
        repo.updateSlotIdById(slotInUse2, confirmedPack);
        Assertions.assertEquals(slotInUse2, repo.readById(confirmedPack).single().get(Package.SLOT_ID));
    }

    @Test
    void updateStatusCodeById() {
        repo.updateStatusCodeById("confirmed", confirmedPack);
        Assertions.assertEquals("confirmed", repo.readById(confirmedPack).single().get(Package.STATUS_CODE));

    }

    @Test
    void updateConfirmedTimeById() {
        repo.updateConfirmedTimeById(confirmedPack);
        Assertions.assertNotNull(repo.readById(confirmedPack).single().get(Package.COMFIRMATION_TIME));
    }

    @Test
    void updatePickedUpTimeById() {
        repo.updatePickedUpTimeById(confirmedPack);
        Assertions.assertNotNull(repo.readById(confirmedPack).single().get(Package.PICKUP_TIME));
    }

    @Test
    void getFilterUserAndStatusCqn() {
        CqnSelect select = repo.getFilterUserAndStatusCqn("I111111", "confirmed");
        Assertions.assertEquals(1, db.run(select).stream().count());
    }
}