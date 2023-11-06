package com.sap.internal.digitallab.packagehandling.manager;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.DeliveryCompany_;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package_;
import com.sap.cds.Row;
import com.sap.cds.ql.Delete;
import com.sap.cds.ql.Select;
import com.sap.cds.services.persistence.PersistenceService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class PackageManagerTest {

    private final PackageManager packMgr;
    private final PersistenceService db;
    private final String pickedUpPack = "4424b2ca-8a1f-4566-ab6f-90fc32b1aee4";
    private final String confirmedPack = "7572a7a1-0f81-449d-a044-d5c4deffadfa";
    private final String newPack = "05CB57BF-1D2F-48F8-AF7A-F57B0E0BA6CD".toLowerCase();

    @Autowired
    PackageManagerTest(PackageManager packMgr, PersistenceService db) {
        this.packMgr = packMgr;
        this.db = db;
    }

    @Test
    void testDeleteAcWhenPickedUpFalse() {
        Assertions.assertFalse(packMgr.evalDeleteAc(pickedUpPack));
    }

    @Test
    void testDeleteAcWhenConfirmedTrue() {
        System.out.println(packMgr.getPackageWithId(confirmedPack));
        Assertions.assertTrue(packMgr.evalDeleteAc(confirmedPack));
    }

    @Test
    void testDeleteAcWhenNewTrue() {
        Assertions.assertTrue(packMgr.evalDeleteAc(newPack));
    }

    @Test
    void testConfirmAc() {
        Assertions.assertTrue(packMgr.evalConfirmAc(newPack));
        Assertions.assertFalse(packMgr.evalConfirmAc(pickedUpPack));
        Assertions.assertFalse(packMgr.evalConfirmAc(confirmedPack));
    }

    @Test
    void testPickUpAc() {
        Assertions.assertFalse(packMgr.evalPickupAc(newPack));
        Assertions.assertFalse(packMgr.evalPickupAc(pickedUpPack));
        Assertions.assertTrue(packMgr.evalPickupAc(confirmedPack));
    }

    @Test
    void testConfirmAction() {
        String slotEmpty = "16855732-136F-4C24-9DCE-47650F7D51B0";
        packMgr.confirmPackage(slotEmpty, newPack);
        Row row = packMgr.getPackageWithId(newPack);
        Assertions.assertEquals(slotEmpty.toLowerCase(), row.get(Package.SLOT_ID));
        Assertions.assertEquals("confirmed", row.get(Package.STATUS_CODE));
    }

    @Test
    void testPickUpAction() {
        String confirmedPack2 = "07f88a8e-a23b-4305-8866-225038492304";
        packMgr.pickupPackage(confirmedPack2);
        Row row = packMgr.getPackageWithId(confirmedPack2);
        Assertions.assertEquals("pickedup", row.get(Package.STATUS_CODE));
    }

    @Test
    void testUpdateCompanyReference() {
        packMgr.updateDeletedDeliveryCompany();
        db.run(
                Delete.from(DeliveryCompany_.class).byId("6480a902-007c-4cdd-a6a3-0f3a88d24fe0")
        );
        packMgr.updateDeletedDeliveryCompany();
    }

    @Test
    void testFilterConfirmed() {
        Assertions.assertEquals(0, db.run(packMgr.getFilterUserAndConfirmedStatusCqn("admin")).stream().count());
        Assertions.assertEquals(1, db.run(packMgr.getFilterUserAndConfirmedStatusCqn("I111111")).stream().count());
    }

    @Test
    void poc() {
        System.out.println(
                db.run(
                        Select.from(Package_.class)
                )
        );
    }
}