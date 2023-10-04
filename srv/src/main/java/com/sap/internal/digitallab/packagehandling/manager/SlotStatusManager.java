package com.sap.internal.digitallab.packagehandling.manager;

import org.springframework.stereotype.Component;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.SlotStatus;

@Component
public class SlotStatusManager {

    public final String EMPTY_STATUS = "empty";
    public final String UNAVAILABLE_STATUS = "unavailable";
    public final String INUSE_STATUS = "inuse";
    
    public SlotStatus emptySlotStatus() {
        SlotStatus slotStatus = SlotStatus.create();
        slotStatus.setCode(EMPTY_STATUS);
        return slotStatus;
    }
}
