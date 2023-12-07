package com.sap.internal.digitallab.packagehandling.service;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

public class RegistrationServiceTest extends BaseServiceTest {

    private final String prefix = "/api/RegistrationService/";

    @Test
    void testCreatePackageByAdmin() {
        String url = host + port + prefix + "Package";
        String body = "{" +
                "  \"recipient_ID\": \"CD5B6B86-90E4-4F19-BA3B-1F3366F92F18\"," +
                "  \"deliveryCompany_ID\": \"6480a902-007c-4cdd-a6a3-0f3a88d24fe0\"," +
                "  \"type_code\": \"newspaper\"," +
                "  \"receptionist_ID\": \"0278CAE0-6680-489F-ABAE-25DBE4B5C312\"," +
                "  \"comment\": \"no comment\"" +
                "}";
        create(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url, body)
                .then()
                .statusCode(201)
                .body("type_code", Matchers.equalTo("newspaper"))
                .body("ID", Matchers.notNullValue());
    }

    @Test
    void testCreatePackageByReceptionistShouldAutoFillStatus() {
        String url = host + port + prefix + "Package";
        String body = "{" +
                "  \"recipient_ID\": \"CD5B6B86-90E4-4F19-BA3B-1F3366F92F18\"," +
                "  \"deliveryCompany_ID\": \"6480a902-007c-4cdd-a6a3-0f3a88d24fe0\"," +
                "  \"type_code\": \"newspaper\"," +
                "  \"receptionist_ID\": \"0278CAE0-6680-489F-ABAE-25DBE4B5C312\"," +
                "  \"comment\": \"no comment\"" +
                "}";
        create(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url, body)
                .then()
                .statusCode(201)
                .body("status_code", Matchers.equalTo("new"))
                .body("ID", Matchers.notNullValue());
    }

    @Test
    void testUnsupportedOpPackage() {
        String url = host + port + prefix + "Package(8176AA8C-A7CF-4FF7-AD38-BE483D991735)";
        testUnsupportedOpForRole(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url);
        testUnsupportedOpForRole(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url);
    }

    @Test
    void testAuthorizationAccessToPackageType() {
        String url = host + port + prefix + "PackageType";
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url).then().statusCode(200);
        read(MGR_KEY, mockUsers.get(MGR_KEY), url).then().statusCode(403);
        read(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url).then().statusCode(200);
        read(USER_KEY, mockUsers.get(USER_KEY), url).then().statusCode(403);
    }

    @Test
    void testAuthorizationAccessToPackageStatus() {
        String url = host + port + prefix + "PackageStatus";
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url).then().statusCode(200);
        read(MGR_KEY, mockUsers.get(MGR_KEY), url).then().statusCode(403);
        read(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url).then().statusCode(200);
        read(USER_KEY, mockUsers.get(USER_KEY), url).then().statusCode(403);
    }

    @Test
    void testAuthorizationAccessToDeliveryCompany() {
        String url = host + port + prefix + "DeliveryCompany";
        read(ADMIN_KEY, mockUsers.get(ADMIN_KEY), url).then().statusCode(200);
        read(MGR_KEY, mockUsers.get(MGR_KEY), url).then().statusCode(403);
        read(RECEPTIONIST_KEY, mockUsers.get(RECEPTIONIST_KEY), url).then().statusCode(200);
        read(USER_KEY, mockUsers.get(USER_KEY), url).then().statusCode(403);
    }

    private void testUnsupportedOpForRole(String uname, String pwd, String url) {
        deleteAndCheckStatus(uname, pwd, url, 403);
        readAndCheckStatus(uname, pwd, url, 403);
        updateAndCheckStatus(uname, pwd, url, 403);
    }

}
