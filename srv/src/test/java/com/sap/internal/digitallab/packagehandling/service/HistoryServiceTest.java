package com.sap.internal.digitallab.packagehandling.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Map;


public class HistoryServiceTest extends BaseServiceTest {
    final String prefix = "/api/HistoryService/";

    @Test
    void testReadPackages() {
        String url = host + port + prefix + "Package";
        testSupportReadForAllRoles(url);
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
        testSupportReadForAllRoles(url);
    }

    @Test
    void testReadPackageStatus() {
        String url = host + port + prefix + "PackageStatus";
        testSupportReadForAllRoles(url);
    }

    @Test
    void testReadDeliveryCompany() {
        String url = host + port + prefix + "DeliveryCompany";
        testSupportReadForAllRoles(url);
    }

    @Test
    void testNotSupportedOperationsPackage() {
        String url = host + port + prefix + "Package";
        testNotSupportedOpForAllRoles(url);
    }

    @Test
    void testNotSupportedOperationsPackageStatus() {
        String url = host + port + prefix + "PackageStatus";
        testNotSupportedOpForAllRoles(url);
    }

    @Test
    void testNotSupportedOperationsPackageType() {
        String url = host + port + prefix + "PackageType";
        testNotSupportedOpForAllRoles(url);
    }

    @Test
    void testNotSupportedOperationsDeliveryCompany() {
        String url = host + port + prefix + "DeliveryCompany";
        testNotSupportedOpForAllRoles(url);
    }

    private void testSupportReadForAllRoles(String url) {
        for (Map.Entry<String, String> entry : mockUsers.entrySet()) {
            readAndCheckStatus(entry.getKey(), entry.getValue(), url, 200);
        }
    }

    private void testNotSupportedOpForAllRoles(String url) {
        for (Map.Entry<String, String> entry : mockUsers.entrySet()) {
            deleteAndCheckStatus(entry.getKey(), entry.getValue(), url, 405);
            createAndCheckStatus(entry.getKey(), entry.getValue(), url, 405);
            updateAndCheckStatus(entry.getKey(), entry.getValue(), url, 405);
        }
    }
}
