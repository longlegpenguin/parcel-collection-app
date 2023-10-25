package com.sap.internal.digitallab.packagehandling.service;

import io.restassured.http.ContentType;
import io.restassured.parsing.Parser;
import io.restassured.response.Response;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.defaultParser;
import static io.restassured.RestAssured.given;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ActiveProfiles("test")
public class BaseServiceTest {

    protected String host = "http://localhost:";
    @LocalServerPort
    protected Integer port;

    protected Map<String, String> mockUsers;
    protected final String ADMIN_KEY = "admin";
    protected final String MGR_KEY = "manager";
    protected final String RECEPTIONIST_KEY = "recep";
    protected final String USER_KEY = "I111111";
    protected final String USER_KEY2 = "I333333";

    public BaseServiceTest() {
        mockUsers = new HashMap<>();
        mockUsers.put("admin", "admin");
        mockUsers.put("manager", "manager");
        mockUsers.put("I111111", "user");
        mockUsers.put("recep", "recep");
        mockUsers.put("I333333", "user");
    }

    int getResponseCnt(Response response) {
        return response.getBody().jsonPath().getList("value").size();
    }

    Response read(String uname, String pwd, String url) {
        defaultParser = Parser.JSON;
        return
                given()
                        .auth().preemptive().basic(uname, pwd)
                        .headers("Content-Type", ContentType.JSON, "Accept", ContentType.JSON)
                        .when()
                        .get(url)
                        .then()
                        .contentType(ContentType.JSON).extract().response();
    }

    Response create(String uname, String pwd, String url, String body) {
        return given()
                .auth().preemptive().basic(uname, pwd)
                .contentType("application/json")
                .body(body)
                .when()
                .post(url)
                .then()
                .extract().response();
    }

    Response update(String uname, String pwd, String url, String body) {
        return given()
                .auth().preemptive().basic(uname, pwd)
                .contentType("application/json")
                .body(body)
                .when()
                .put(url)
                .then()
                .extract().response();
    }

    Response delete(String uname, String pwd, String url) {
        defaultParser = Parser.JSON;
        return
                given()
                        .auth().preemptive().basic(uname, pwd)
                        .when()
                        .delete(url)
                        .then()
                        .contentType(ContentType.JSON).extract().response();
    }

    void readAndCheck200(String uname, String pwd, String url) {
        read(uname, pwd, url).then().statusCode(200);
    }

    void createAndCheck405(String uname, String pwd, String url) {
        create(uname, pwd, url, "{}").then().statusCode(405);
    }

    void updateAndCheck405(String uname, String pwd, String url) {
        update(uname, pwd, url, "{}").then().statusCode(405);
    }

    void deleteAndCheck405(String uname, String pwd, String url) {
        delete(uname, pwd, url).then().statusCode(405);
    }

}
