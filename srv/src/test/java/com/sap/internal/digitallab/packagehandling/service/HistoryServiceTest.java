package com.sap.internal.digitallab.packagehandling.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;


public class HistoryServiceTest extends BaseServiceTest {
    final String prefix = "/api/HistoryService/";

    @Test
    void testReadPackages() {
        String url = host + port + prefix + "Package";
        readAndCheck200("admin", "admin", url);
        readAndCheck200("manager", "manager", url);
        readAndCheck200("I111111", "user", url);
        readAndCheck200("recep", "recep", url);
    }

    @Test
    void testOnlyOwnPackageIsRead() {
        String url = host + port + prefix + "Package";
        Assertions.assertEquals(4, getResponseCnt(read("I111111", "user", url)));
        Assertions.assertEquals(0, getResponseCnt(read("admin", "admin", url)));
    }

    @Test
    void testReadPackageType() {
        String url = host + port + prefix + "PackageType";
        readAndCheck200("admin", "admin", url);
        readAndCheck200("manager", "manager", url);
        readAndCheck200("I111111", "user", url);
        readAndCheck200("recep", "recep", url);
    }

    @Test
    void testReadPackageStatus() {
        String url = host + port + prefix + "PackageStatus";
        readAndCheck200("admin", "admin", url);
        readAndCheck200("manager", "manager", url);
        readAndCheck200("I111111", "user", url);
        readAndCheck200("recep", "recep", url);
    }

    @Test
    void testReadDeliveryCompany() {
        String url = host + port + prefix + "DeliveryCompany";
        readAndCheck200("admin", "admin", url);
        readAndCheck200("manager", "manager", url);
        readAndCheck200("I111111", "user", url);
        readAndCheck200("recep", "recep", url);
    }

    @Test
    void testNotSupportedOperationsPackage() {
        String url = host + port + prefix + "Package";
        deleteAndCheck405("admin", "admin", url);
        createAndCheck405("admin", "admin", url);
        updateAndCheck405("admin", "admin", url);
    }

    @Test
    void testNotSupportedOperationsPackageStatus() {
        String url = host + port + prefix + "PackageStatus";
        deleteAndCheck405("admin", "admin", url);
        createAndCheck405("admin", "admin", url);
        updateAndCheck405("admin", "admin", url);
    }

    @Test
    void testNotSupportedOperationsPackageType() {
        String url = host + port + prefix + "PackageType";
        deleteAndCheck405("admin", "admin", url);
        createAndCheck405("admin", "admin", url);
        updateAndCheck405("admin", "admin", url);
    }

    @Test
    void testNotSupportedOperationsDeliveryCompany() {
        String url = host + port + prefix + "DeliveryCompany";
        deleteAndCheck405("admin", "admin", url);
        createAndCheck405("admin", "admin", url);
        updateAndCheck405("admin", "admin", url);
    }
}
