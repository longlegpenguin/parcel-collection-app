package com.sap.internal.digitallab.packagehandling.service;

import io.restassured.response.Response;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

public class PackageServiceTest extends BaseServiceTest {
    private final String prefix = "/api/PackageService/";

    @Test
    void testCreatPackageNotSupported() {
        String url = host + port + prefix + "Package";
        createAndCheckStatus(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url, 403);
    }

    @Test
    void testDeletePackage() {
        String url = host + port + prefix + "Package(DE6AE963-1436-44AF-BED6-C0B7378282F3)";
        deleteAndCheckStatus(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url, 204);
    }

    @Test
    void testUpdatePackage() {
        String url = host + port + prefix + "Package(BE7DD47C-0A65-43D0-91B1-508CF88ACBDF)";
        String body = "{" +
                "  \"recipient\": \"I555555\"," +
                "  \"pickupTime\": null," +
                "  \"slot_ID\": null," +
                "  \"deliveryCompany_ID\": \"724a082e-8f05-4d5e-bbc3-b8acaa30b8fb\"," +
                "  \"type_code\": \"newspaper\"," +
                "  \"status_code\": \"new\"," +
                "  \"receptionist\": \"C456789\"" +
                "}";
        update(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url, body)
                .then()
                .statusCode(200)
                .body("type_code", Matchers.equalTo("newspaper"));
    }

    @Test
    void testPickupAction() {
        String url = host + port + prefix + "pickup";
        Response response = create(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url,
                "{" +
                        "  \"packageId\": \"8176AA8C-A7CF-4FF7-AD38-BE483D991735\"" +
                        "}");

        response.then()
                .statusCode(200)
                .body("status_code", Matchers.equalTo("pickedup"));
    }

    @Test
    void testConfirmAction() {
        String url = host + port + prefix + "confirm";
        Response response = create(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url,
                "{" +
                        "  \"packagesIds\": [\"be7dd47c-0a65-43d0-91b1-508cf88acbdf\"]," +
                        "  \"slotId\": \"9be3cedc-e657-4a8b-b37e-ffc494d96952\"" +
                        "}");

        response.then()
                .statusCode(200)
                .body("value", Matchers.equalTo(true));
    }

    @Test
    void testAuthorizationAccessToPackageType() {
        String url = host + port + prefix + "PackageType";
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url).then().statusCode(200);
        read(MGR_KEY, mockUsers.get(MGR_KEY), url).then().statusCode(200);
        read(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url).then().statusCode(200);
        read(USER_KEY, mockUsers.get(USER_KEY), url).then().statusCode(403);
    }

    @Test
    void testAuthorizationAccessToPackageStatus() {
        String url = host + port + prefix + "PackageStatus";
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url).then().statusCode(200);
        read(MGR_KEY, mockUsers.get(MGR_KEY), url).then().statusCode(200);
        read(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url).then().statusCode(200);
        read(USER_KEY, mockUsers.get(USER_KEY), url).then().statusCode(403);
    }

    @Test
    void testAuthorizationAccessToStorageSlot() {
        String url = host + port + prefix + "StorageSlot";
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url).then().statusCode(200);
        read(MGR_KEY, mockUsers.get(MGR_KEY), url).then().statusCode(200);
        read(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url).then().statusCode(200);
        read(USER_KEY, mockUsers.get(USER_KEY), url).then().statusCode(403);
    }

    @Test
    void testAuthorizationAccessToStorage() {
        String url = host + port + prefix + "Storage";
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url).then().statusCode(200);
        read(MGR_KEY, mockUsers.get(MGR_KEY), url).then().statusCode(200);
        read(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url).then().statusCode(200);
        read(USER_KEY, mockUsers.get(USER_KEY), url).then().statusCode(403);
    }

    @Test
    void testUnsupportedOp() {
        String url = host + port + prefix + "Storage";
        testUnsupportedOpForRole(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url);
        url = host + port + prefix + "StorageSlot";
        testUnsupportedOpForRole(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url);
        url = host + port + prefix + "PackageStatus";
        testUnsupportedOpForRole(MGR_KEY, mockUsers.get(MGR_KEY), url);
        url = host + port + prefix + "PackageType";
        testUnsupportedOpForRole(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url);
    }

    private void testUnsupportedOpForRole(String uname, String pwd, String url) {
        deleteAndCheckStatus(uname, pwd, url, 405);
        createAndCheckStatus(uname, pwd, url, 405);
        updateAndCheckStatus(uname, pwd, url, 405);
    }
}
