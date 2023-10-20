package com.sap.internal.digitallab.packagehandling.manager;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PackageManagerTest {

    private final PackageManager packMgr;

    @Autowired
    PackageManagerTest(PackageManager packMgr) {
        this.packMgr = packMgr;
    }
}