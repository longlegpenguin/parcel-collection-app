package com.sap.internal.digitallab.packagehandling.service;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ActiveProfiles("test")
public class CompanyServiceTest extends BaseServiceTest {
    @Test
    void testReadAllCompany() {
        String url = host + port + "/api/CompanyService/DeliveryCompany";

        given()
                .auth().preemptive().basic("admin", "admin")
                .when()
                .get(url)
                .then()
                .statusCode(200);

        given()
                .auth().preemptive().basic("manager", "manager")
                .when()
                .get(url)
                .then()
                .statusCode(200);

        given()
                .auth().preemptive().basic("I111111", "user")
                .when()
                .get(url)
                .then()
                .statusCode(403);

        given()
                .auth().preemptive().basic("recep", "recep")
                .when()
                .get(url)
                .then()
                .statusCode(403);
    }

    @Test
    void testReadSingleCompany() {
        String url = host + port + "/api/CompanyService/DeliveryCompany(69bc3a65-e4e2-4235-864a-96ef2096b5c7)";

        given()
                .auth().preemptive().basic("admin", "admin")
                .when()
                .get(url)
                .then()
                .statusCode(200);

        given()
                .auth().preemptive().basic("manager", "manager")
                .when()
                .get(url)
                .then()
                .statusCode(200);

        given()
                .auth().preemptive().basic("I111111", "user")
                .when()
                .get(url)
                .then()
                .statusCode(403);

        given()
                .auth().preemptive().basic("recep", "recep")
                .when()
                .get(url)
                .then()
                .statusCode(403);
    }

    @Test
    void testCreateCompanyByAdmin() {
        ExtractableResponse<Response> response =
                given()
                        .auth().preemptive().basic("admin", "admin")
                        .contentType("application/json")
                        .body("{" +
                                "      \"name\": \"FedEx\"," +
                                "      \"logo\": \"https://images.app.goo.gl/bzEzvAdv1wb6Socf6\"" +
                                "}")
                        .when()
                        .post(host + port + "/api/CompanyService/DeliveryCompany")
                        .then()
                        .statusCode(201)
                        .extract();

        given()
                .auth().preemptive().basic("admin", "admin")
                .when()
                .get(response.header("Location"))
                .then()
                .statusCode(200)
                .body("ID", Matchers.notNullValue())
                .body("name", Matchers.equalTo("FedEx"))
                .body("logo", Matchers.equalTo("https://images.app.goo.gl/bzEzvAdv1wb6Socf6"));
    }

    @Test
    void testCreateCompanyByFacilityManager() {
        ExtractableResponse<Response> response =
                given()
                        .auth().preemptive().basic("manager", "manager")
                        .contentType("application/json")
                        .body("{" +
                                "      \"name\": \"FedEx2\"," +
                                "      \"logo\": \"https://images.app.goo.gl/bzEzvAdv1wb6Socf6\"" +
                                "}")
                        .when()
                        .post(host + port + "/api/CompanyService/DeliveryCompany")
                        .then()
                        .statusCode(201)
                        .extract();

        given()
                .auth().preemptive().basic("manager", "manager")
                .when()
                .get(response.header("Location"))
                .then()
                .statusCode(200)
                .body("ID", Matchers.notNullValue())
                .body("name", Matchers.equalTo("FedEx2"))
                .body("logo", Matchers.equalTo("https://images.app.goo.gl/bzEzvAdv1wb6Socf6"));
    }

    @Test
    void testUpdateCompanyByFacilityManager() {
        given()
                .auth().preemptive().basic("manager", "manager")
                .contentType("application/json")
                .body("{" +
                        "      \"name\": \"FedEx5\"," +
                        "      \"logo\": \"https://images.app.goo.gl/bzEzvAdv1wb6Socf6\"" +
                        "}")
                .when()
                .put(host + port + "/api/CompanyService/DeliveryCompany(6480a902-007c-4cdd-a6a3-0f3a88d24fe0)")
                .then()
                .statusCode(200)
                .extract();

        given()
                .auth().preemptive().basic("manager", "manager")
                .when()
                .get(host + port + "/api/CompanyService/DeliveryCompany(6480a902-007c-4cdd-a6a3-0f3a88d24fe0)")
                .then()
                .statusCode(200)
                .body("name", Matchers.equalTo("FedEx5"));
    }

    @Test
    void testUpdateCompanyByAdmin() {

        given()
                .auth().preemptive().basic("admin", "admin")
                .contentType("application/json")
                .body("{" +
                        "      \"name\": \"FedEx6\"," +
                        "      \"logo\": \"https://images.app.goo.gl/bzEzvAdv1wb6Socf6\"" +
                        "}")
                .when()
                .put(host + port + "/api/CompanyService/DeliveryCompany(6480a902-007c-4cdd-a6a3-0f3a88d24fe0)")
                .then()
                .statusCode(200)
                .extract();
        given()
                .auth().preemptive().basic("admin", "admin")
                .when()
                .get(host + port + "/api/CompanyService/DeliveryCompany(6480a902-007c-4cdd-a6a3-0f3a88d24fe0)")
                .then()
                .statusCode(200)
                .body("name", Matchers.equalTo("FedEx6"));
    }

    @Test
    void testUpdateCompanyByOther() {
        given()
                .auth().preemptive().basic("I111111", "user")
                .contentType("application/json")
                .body("{" +
                        "      \"name\": \"FedEx7\"," +
                        "      \"logo\": \"https://images.app.goo.gl/bzEzvAdv1wb6Socf6\"" +
                        "}")
                .when()
                .put(host + port + "/api/CompanyService/DeliveryCompany(6480a902-007c-4cdd-a6a3-0f3a88d24fe0)")
                .then()
                .statusCode(403);

        given()
                .auth().preemptive().basic("recep", "recep")
                .contentType("application/json")
                .body("{" +
                        "      \"name\": \"FedEx7\"," +
                        "      \"logo\": \"https://images.app.goo.gl/bzEzvAdv1wb6Socf6\"" +
                        "}")
                .when()
                .put(host + port + "/api/CompanyService/DeliveryCompany(6480a902-007c-4cdd-a6a3-0f3a88d24fe0)")
                .then()
                .statusCode(403);
    }

    @Test
    void testCreateCompanyByOther() {
        given()
                .auth().preemptive().basic("I111111", "user")
                .contentType("application/json")
                .body("{" +
                        "      \"name\": \"FedEx3\"," +
                        "      \"logo\": \"https://images.app.goo.gl/bzEzvAdv1wb6Socf6\"" +
                        "}")
                .when()
                .post(host + port + "/api/CompanyService/DeliveryCompany")
                .then()
                .statusCode(403);

        given()
                .auth().preemptive().basic("recep", "recep")
                .contentType("application/json")
                .body("{" +
                        "      \"name\": \"FedEx4\"," +
                        "      \"logo\": \"https://images.app.goo.gl/bzEzvAdv1wb6Socf6\"" +
                        "}")
                .when()
                .post(host + port + "/api/CompanyService/DeliveryCompany")
                .then()
                .statusCode(403);
    }

    @Test
    void testCompanyNameUniqueConstraint() {
        given()
                .auth().preemptive().basic("admin", "admin")
                .contentType("application/json")
                .body("{" +
                        "      \"name\": \"MPL\"," +
                        "      \"logo\": \"https://images.app.goo.gl/bzEzvAdv1wb6Socf6\"" +
                        "}")
                .when()
                .post(host + port + "/api/CompanyService/DeliveryCompany")
                .then()
                .statusCode(409);

        given()
                .auth().preemptive().basic("recep", "recep")
                .contentType("application/json")
                .body("{" +
                        "      \"ID\": \"6480a902-007c-4cdd-a6a3-0f3a88d24fe0\", " +
                        "      \"name\": \"MPL\"," +
                        "      \"logo\": \"https://images.app.goo.gl/bzEzvAdv1wb6Socf6\"" +
                        "}")
                .when()
                .put(host + port + "/api/CompanyService/DeliveryCompany")
                .then()
                .statusCode(405);
    }

    @Test
    void testDeleteCompanyByAdmin() {
        String url = host + port + "/api/CompanyService/DeliveryCompany(6480a902-007c-4cdd-a6a3-0f3a88d24fe0)";
        given()
                .auth().preemptive().basic("admin", "admin")
                .when()
                .delete(url)
                .then()
                .statusCode(204);

        given()
                .auth().preemptive().basic("admin", "admin")
                .when()
                .get(url)
                .then()
                .statusCode(404);
    }

    @Test
    void testDeleteCompanyByFacilityManager() {
        String url = host + port + "/api/CompanyService/DeliveryCompany(724a082e-8f05-4d5e-bbc3-b8acaa30b8fb)";
        given()
                .auth().preemptive().basic("manager", "manager")
                .when()
                .delete(url)
                .then()
                .statusCode(204);

        given()
                .auth().preemptive().basic("manager", "manager")
                .when()
                .get(url)
                .then()
                .statusCode(404);
    }

    @Test
    void testDeleteCompanyByOthers() {
        String url = host + port + "/api/CompanyService/DeliveryCompany(6480a902-007c-4cdd-a6a3-0f3a88d24fe0)";
        given()
                .auth().preemptive().basic("I111111", "user")
                .when()
                .delete(url)
                .then()
                .statusCode(403);

        given()
                .auth().preemptive().basic("recep", "recep")
                .when()
                .delete(url)
                .then()
                .statusCode(403);
    }
}