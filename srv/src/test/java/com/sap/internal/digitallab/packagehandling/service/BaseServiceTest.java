package com.sap.internal.digitallab.packagehandling.service;

import io.restassured.http.ContentType;
import io.restassured.parsing.Parser;
import io.restassured.response.Response;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

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

    void readAndCheck200(String uname, String pwd, String url) {
        given()
                .auth().preemptive().basic(uname, pwd)
                .when()
                .get(url)
                .then()
                .statusCode(200);
    }

    void postAndCheck405(String uname, String pwd, String url, String body) {
        given()
                .auth().preemptive().basic(uname, pwd)
                .contentType("application/json")
                .body(body)
                .when()
                .post(url)
                .then()
                .statusCode(405);
    }

    void putAndCheck405(String uname, String pwd, String url, String body) {
        given()
                .auth().preemptive().basic(uname, pwd)
                .contentType("application/json")
                .body(body)
                .when()
                .post(url)
                .then()
                .statusCode(405);
    }

    void deleteAndCheck405(String uname, String pwd, String url) {
        given()
                .auth().preemptive().basic(uname, pwd)
                .when()
                .delete(url)
                .then()
                .statusCode(405);
    }

}
