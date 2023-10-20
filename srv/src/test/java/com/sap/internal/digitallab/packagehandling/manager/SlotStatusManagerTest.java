package com.sap.internal.digitallab.packagehandling.manager;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SlotStatusManagerTest {

    private SlotStatusManager statusMgr;

    @BeforeEach
    void setUp() {
        statusMgr = new SlotStatusManager();
    }

    @Test
    void testEmptySlotStatusReturnsEmptyStatus() {
        Assertions.assertEquals(statusMgr.emptySlotStatus().getCode(), "empty");
    }

    @Test
    void testStaticPublicFields() {
        Assertions.assertEquals(statusMgr.EMPTY_STATUS, "empty");
        Assertions.assertEquals(statusMgr.INUSE_STATUS, "inuse");
        Assertions.assertEquals(statusMgr.UNAVAILABLE_STATUS, "unavailable");
    }
}