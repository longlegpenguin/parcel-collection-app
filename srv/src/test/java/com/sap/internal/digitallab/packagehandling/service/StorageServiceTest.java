package com.sap.internal.digitallab.packagehandling.service;

import io.restassured.response.Response;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

public class StorageServiceTest extends BaseServiceTest {

    final String prefix = "/api/StorageService/";

    @Test
    void testAccessibilityToStorage() {
        String url = host + port + prefix + "Storage";
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url).then().statusCode(200);
        read(MGR_KEY, mockUsers.get(MGR_KEY), url).then().statusCode(200);
        read(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url).then().statusCode(403);
        read(USER_KEY, mockUsers.get(USER_KEY), url).then().statusCode(403);
    }

    @Test
    void testCreateStorage() {
        String url = host + port + prefix + "Storage";
        Response response = create(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url,
                "{" +
                        "    \"name\" : \"S200\"," +
                        "    \"locationInstructions\": \"Ghost place\"," +
                        "    \"map\": \"https://longlegpenguin.githu.io\"," +
                        "    \"buildingFloor\" : \"7D5A658D-D9C1-44E6-9DA0-1D29069C4617\"" +
                        "}");
        response.then().statusCode(201);
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), response.header("Location"))
                .then()
                .statusCode(200)
                .body("ID", Matchers.notNullValue())
                .body("name", Matchers.equalTo("S200"));
    }

    @Test
    void testUpdateStorage() {
        String url = host + port + prefix + "Storage(2F33D046-13A8-442C-AEBC-5A687891BE7E)";
        update(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url,
                "{" +
                        "    \"name\" : \"StorageOld9\"," +
                        "    \"buildingFloor\" : \"7D5A658D-D9C1-44E6-9DA0-1D29069C4617\"" +
                        "}")
                .then()
                .statusCode(200)
                .body("ID", Matchers.equalTo("2f33d046-13a8-442c-aebc-5a687891be7e"))
                .body("name", Matchers.equalTo("StorageOld9"));
    }

    @Test
    void testDeleteStorage() {
        String url = host + port + prefix + "Storage(89A4B289-CA53-4BD1-9219-411FAE551F07)";
        delete(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url)
                .then().statusCode(204);
    }

    @Test
    void testAccessibilityToStorageSlot() {
        String url = host + port + prefix + "StorageSlot";
        readAndCheckStatus(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url, 200);
        readAndCheckStatus(MGR_KEY, mockUsers.get(MGR_KEY), url, 200);
        readAndCheckStatus(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url, 403);
        readAndCheckStatus(USER_KEY, mockUsers.get(USER_KEY), url, 403);
    }

    @Test
    void testCreateSlot() {
        String url = host + port + prefix + "StorageSlot";
        Response response = create(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url,
                "{" +
                        "    \"name\" : \"K - 2\"," +
                        "    \"storage\" : { \"ID\": \"2F33D046-13A8-442C-AEBC-5A687891BE7E\", \"name\": \"Storage2\", \"buildingFloor\": \"00c31aa7-a362-45d1-82e7-cb3ed0192da6\" }" +
                        "}");
        response.then().statusCode(201);
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), response.header("Location"))
                .then()
                .statusCode(200)
                .body("ID", Matchers.notNullValue())
                .body("name", Matchers.equalTo("K - 2"));
    }

    @Test
    void testUpdateStorageSlot() {
        String url = host + port + prefix + "StorageSlot(64B16D54-1FA8-4C41-B8F8-47A9D5609578)";
        update(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url,
                "{" +
                        "    \"name\" : \"H - 10\"," +
                        "    \"storage\" : { \"ID\": \"2F33D046-13A8-442C-AEBC-5A687891BE7E\", \"name\": \"Storage2\", \"buildingFloor\": \"00c31aa7-a362-45d1-82e7-cb3ed0192da6\" }" +
                        "}")
                .then()
                .statusCode(200)
                .body("ID", Matchers.equalTo("64b16d54-1fa8-4c41-b8f8-47a9d5609578"))
                .body("name", Matchers.equalTo("H - 10"));
    }

    @Test
    void testDeleteSlot() {
        String url = host + port + prefix + "StorageSlot(69BC3A65-E4E2-4235-864A-96EF2096B5C7)";
        deleteAndCheckStatus(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url, 204);
    }

    @Test
    void testAccessibilityToBuilding() {
        String url = host + port + prefix + "Building";
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url).then().statusCode(200);
        read(MGR_KEY, mockUsers.get(MGR_KEY), url).then().statusCode(200);
        read(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url).then().statusCode(403);
        read(USER_KEY, mockUsers.get(USER_KEY), url).then().statusCode(403);
    }

    @Test
    void testAccessibilityToBuildingFloor() {
        String url = host + port + prefix + "BuildingFloor";
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url).then().statusCode(200);
        read(MGR_KEY, mockUsers.get(MGR_KEY), url).then().statusCode(200);
        read(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url).then().statusCode(403);
        read(USER_KEY, mockUsers.get(USER_KEY), url).then().statusCode(403);
    }

    @Test
    void testAccessibilityToSlotStatus() {
        String url = host + port + prefix + "SlotStatus";
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url).then().statusCode(200);
        read(MGR_KEY, mockUsers.get(MGR_KEY), url).then().statusCode(200);
        read(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url).then().statusCode(403);
        read(USER_KEY, mockUsers.get(USER_KEY), url).then().statusCode(403);
    }

    @Test
    void testMassCreate() {
        String url = host + port + prefix + "massCreate";
        create(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url,
                "{" +
                        "    \"row\" :3," +
                        "    \"rowType\" : \"C\"," +
                        "    \"col\" : 4," +
                        "    \"colType\" : \"N\"," +
                        "    \"storage\" : \"2F33D046-13A8-442C-AEBC-5A687891BE7E\"" +
                        "}").then()
                .statusCode(200)
                .body("value", Matchers.equalTo(12));
        create(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url,
                "{" +
                        "    \"row\" :4," +
                        "    \"rowType\" : \"C\"," +
                        "    \"col\" : 4," +
                        "    \"colType\" : \"N\"," +
                        "    \"storage\" : \"2F33D046-13A8-442C-AEBC-5A687891BE7E\"" +
                        "}").then()
                .statusCode(200)
                .body("value", Matchers.equalTo(4));
    }

    @Test
    void testCheckDisability() {
        String url = host + port + prefix + "SlotStatus";
        testUnsupportedOpForRole(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url);
        testUnsupportedOpForRole(MGR_KEY, mockUsers.get(MGR_KEY), url);
        url = host + port + prefix + "Building";
        testUnsupportedOpForRole(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url);
        testUnsupportedOpForRole(MGR_KEY, mockUsers.get(MGR_KEY), url);
        url = host + port + prefix + "BuildingFloor";
        testUnsupportedOpForRole(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url);
        testUnsupportedOpForRole(MGR_KEY, mockUsers.get(MGR_KEY), url);
    }

    private void testUnsupportedOpForRole(String uname, String pwd, String url) {
        deleteAndCheckStatus(uname, pwd, url, 405);
        createAndCheckStatus(uname, pwd, url, 405);
        updateAndCheckStatus(uname, pwd, url, 405);
    }
}
