package com.sap.internal.digitallab.packagehandling.manager.core;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.Result;
import com.sap.internal.digitallab.packagehandling.repository.core.StorageRepository;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.Storage;

@Component
public class StorageManager /* extends BaseManager */ {

    private static final Logger LOGGER = LoggerFactory.getLogger("StorageSlotServiceImpl_LOGGER");

    private final StorageRepository storageResp;
    private final StorageSlotManager slotManager;
    private final SlotStatusManager statusManager;

    @Autowired
    public StorageManager(StorageRepository storageResp, StorageSlotManager slotManager, SlotStatusManager statusManager) {
        this.slotManager = slotManager;
        this.statusManager = statusManager;
        this.storageResp = storageResp;
    }

    /**
     * Updates the given storage's total package number virtual field.
     * 
     * @param storage Storage
     * 
     */
    public void updateTotalPackageVf(Storage storage) {

        Result rowsOfSlotsEntity = storageResp.selectSlotsById(storage.getId());

        int total = rowsOfSlotsEntity
                .stream()
                .mapToInt(r -> slotManager.cntTotalPackagesNumber(r.get("ID").toString()))
                .sum();

        storage.setTotalPackages(total);
    }

    /**
     * Updates the given storage's current package number virtual field.
     * 
     * @param storage Storage
     * 
     */
    public void updateConfirmedPackageVf(Storage storage) {

        Result rowsOfSlotsEntity = storageResp.selectSlotsById(storage.getId());

        int total = rowsOfSlotsEntity
                .stream()
                .mapToInt(r -> slotManager.cntConfirmedPackagesNumber(r.get("ID").toString()))
                .sum();

        storage.setCurrentPackages(total);
    }

    /**
     * Evaluates and updates virtual field DeleteAc for storages,
     * true if all slots are not in use.
     * 
     * @param storage Storage from storage service
     */
    public void updateDeleteAc(Storage storage) {
        Result rows = storageResp.selectSlotsById(storage.getId());
        LOGGER.atInfo().log("Read slots {}", rows);
        boolean canDelete = rows
                .stream()
                .noneMatch(r -> r.get("status_code").equals(statusManager.INUSE_STATUS));
        storage.setDeleteAc(canDelete);
    }
}
