package com.sap.internal.digitallab.packagehandling.service;

import io.restassured.response.Response;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Map;

public class PickupServiceTest extends BaseServiceTest {

    private final String prefix = "/api/PickupService/";

    @Test
    void testSupportReadPackage() {
        String url = host + port + prefix + "Package";
        testSupportReadForAllRoles(url);
    }

    @Test
    void testReadOnlyOwnedConfirmedPackage() {
        String url = host + port + prefix + "Package";
        Assertions.assertEquals(
                1,
                getResponseCnt(
                        read(USER_KEY, mockUsers.get(USER_KEY), url)));
    }

    @Test
    void testReadDeliveryCompany() {
        String url = host + port + prefix + "DeliveryCompany";
        System.out.println(url);
        readAndCheckStatus("admin", "admin", url, 200);
    }

    @Test
    void testSupportReadPackageType() {
        String url = host + port + prefix + "PackageType";
        testSupportReadForAllRoles(url);
    }

    @Test
    void testSupportReadPackageStatus() {
        String url = host + port + prefix + "PackageStatus";
        testSupportReadForAllRoles(url);
    }

    @Test
    void testSupportReadStorage() {
        String url = host + port + prefix + "Storage";
        testSupportReadForAllRoles(url);
    }

    @Test
    void testSupportReadStorageSlot() {
        String url = host + port + prefix + "StorageSlot";
        testSupportReadForAllRoles(url);
    }

    @Test
    void testSupportReadDeliveryCompany() {
        String url = host + port + prefix + "DeliveryCompany";
        testSupportReadForAllRoles(url);
    }

    @Test
    void testUnSupportReadPackageStatus() {
        String url = host + port + prefix + "PackageStatus";
        testUnsupportedOpForAllRoles(url);
    }

    @Test
    void testUnSupportReadStorage() {
        String url = host + port + prefix + "Storage";
        testUnsupportedOpForAllRoles(url);
    }

    @Test
    void testUnSupportReadStorageSlot() {
        String url = host + port + prefix + "StorageSlot";
        testUnsupportedOpForAllRoles(url);
    }

    @Test
    void testUnSupportReadDeliveryCompany() {
        String url = host + port + prefix + "DeliveryCompany";
        testUnsupportedOpForAllRoles(url);
    }

    @Test
    void testUnsupportedOperationsPackage() {
        String url = host + port + prefix + "Package";
        testUnsupportedOpForAllRoles(url);
    }

    @Test
    void testPickAction() {
        String url = host + port + prefix + "pickup";
        Response response = create(USER_KEY2, mockUsers.get(USER_KEY2), url,
                "{" +
                        "  \"packageId\": \"1F81A0C3-84CE-4EC8-864B-5B2283832538\"" +
                        "}");

        response.then()
                .statusCode(200)
                .body("status_code", Matchers.equalTo("pickedup"));
    }

    private void testUnsupportedOpForAllRoles(String url) {
        for (Map.Entry<String, String> entry : mockUsers.entrySet()) {
            deleteAndCheckStatus(entry.getKey(), entry.getValue(), url, 405);
            createAndCheckStatus(entry.getKey(), entry.getValue(), url, 405);
            updateAndCheckStatus(entry.getKey(), entry.getValue(), url, 405);
        }
    }

    private void testSupportReadForAllRoles(String url) {
        for (Map.Entry<String, String> entry : mockUsers.entrySet()) {
            readAndCheckStatus(entry.getKey(), entry.getValue(), url, 200);
        }
    }


}
