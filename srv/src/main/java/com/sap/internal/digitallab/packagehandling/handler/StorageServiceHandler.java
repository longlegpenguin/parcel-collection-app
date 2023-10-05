package com.sap.internal.digitallab.packagehandling.handler;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.*;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.internal.digitallab.packagehandling.manager.core.StorageManager;
import com.sap.internal.digitallab.packagehandling.manager.core.StorageSlotManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Stream;

@Component
@ServiceName(StorageService_.CDS_NAME)
public class StorageServiceHandler implements EventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger("StorageServiceHandler_logger");

    private final StorageSlotManager slotManager;
    private final StorageManager storageManager;

    @Autowired
    public StorageServiceHandler(StorageSlotManager slotManager, StorageManager storageManager) {
        this.slotManager = slotManager;
        this.storageManager = storageManager;
    }

    /*
     * ------------------------------------------------------------------------------
     * Actions
     * ------------------------------------------------------------------------------
     */

    /**
     * Custom implementation for massCreate action
     *
     * @param context MassCreateContext
     */
    @On
    public void massCreateAction(MassCreateContext context) {

        int cnt = slotManager.massCreate(
                context.getRowType(),
                context.getRow(),
                context.getColType(),
                context.getCol(),
                context.getStorage());
        context.setResult(cnt);
    }

    /*
     * ------------------------------------------------------------------------------
     * Custom preprocessing, handling and postprocessing.
     * ------------------------------------------------------------------------------
     */

    /**
     * At GET request, updates slot's virtual fields and action control.
     *
     * @param slots StorageSlot list
     */
    @After(event = {CqnService.EVENT_READ}, entity = StorageSlot_.CDS_NAME)
    public void afterReadStorageSlot(Stream<StorageSlot> slots) {
        slots.forEach(
                slot -> {
                    slotManager.updateTotalPackageVf(slot);
                    slotManager.updateDeleteAc(slot);
                });
    }

    /**
     * At GET request, updates storage's virtual fields and action control.
     *
     * @param storages Storage list
     */
    @After(event = {CqnService.EVENT_READ}, entity = Storage_.CDS_NAME)
    public void afterReadStorages(List<Storage> storages) {
        storages.forEach(s -> {
            storageManager.updateConfirmedPackageVf(s);
            storageManager.updateDeleteAc(s);
            storageManager.updateTotalPackageVf(s);
        });
    }
}