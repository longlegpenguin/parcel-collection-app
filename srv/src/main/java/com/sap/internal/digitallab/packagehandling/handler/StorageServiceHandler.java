package com.sap.internal.digitallab.packagehandling.handler;

import java.util.List;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.Storage;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.StorageSlot;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.StorageSlot_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.Storage_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.MassCreateContext;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.StorageService_;

import com.sap.cds.services.cds.ApplicationService;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.internal.digitallab.packagehandling.service.StorageServiceImpl;
import com.sap.internal.digitallab.packagehandling.service.StorageSlotServiceImpl;

@Component
@ServiceName(StorageService_.CDS_NAME)
public class StorageServiceHandler implements EventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger("StorageServiceHandler_logger");

    @Autowired
    @Qualifier(StorageService_.CDS_NAME)
    private ApplicationService storageService;

    @Autowired
    private StorageSlotServiceImpl slotSrv;

    @Autowired
    private StorageServiceImpl storageSrv;

    /**
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

        int cnt = slotSrv.massCreate(
                context.getRowType(),
                context.getRow(),
                context.getColType(),
                context.getCol(),
                context.getStorage());
        context.setResult(cnt);
    }

    /**
     * ------------------------------------------------------------------------------
     * Custom preprocessing, handling and postprocessing.
     * ------------------------------------------------------------------------------
     */

    /**
     * At GET request, updates slot's virtual fields and action control.
     * 
     * @param slots StorageSlot list
     */
    @After(event = { CqnService.EVENT_READ }, entity = StorageSlot_.CDS_NAME)
    public void afterReadStorageSlot(Stream<StorageSlot> slots) {
        slots.forEach(
                slot -> {
                    slotSrv.updateTotalPackageVf(slot);
                    slotSrv.updateDeleteAc(slot);
                });
    }

    /**
     * At GET request, updates storage's virtual fields and action control.
     * 
     * @param storages Storage list
     */
    @After(event = { CqnService.EVENT_READ }, entity = Storage_.CDS_NAME)
    public void afterReadStorages(List<Storage> storages) {
        storages.forEach(s -> {
            storageSrv.updateConfirmedPackageVf(s);
            storageSrv.updateDeleteAc(s);
            storageSrv.updateTotalPackageVf(s);
        });
    }
}