package com.sap.internal.digitallab.packagehandling.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.Result;
import com.sap.internal.digitallab.packagehandling.repository.StorageRespository;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.Storage;

@Component
public class StorageServiceImpl /* extends BaseService */ {

    private static final Logger LOGGER = LoggerFactory.getLogger("StorageSlotServiceImpl_LOGGER");

    @Autowired
    private StorageRespository storageResp;

    @Autowired
    private StorageSlotServiceImpl slotSrv;

    @Autowired
    private SlotStatusServiceImpl statusSrv;

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
                .mapToInt(r -> slotSrv.cntTotalPackagesNumber(r.get("ID").toString()))
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
                .mapToInt(r -> slotSrv.cntConfirmedPackagesNumber(r.get("ID").toString()))
                .sum();

        storage.setCurrentPackages(total);
    }

    /**
     * Evaluates and updates virtual field DeleteAc for storages,
     * true if all slots are not in use.
     * 
     * @param storage
     */
    public void updateDeleteAc(Storage storage) {
        Result rows = storageResp.selectSlotsById(storage.getId());
        LOGGER.atInfo().log("Read slots {}", rows);
        boolean canDelete = rows
                .stream()
                .allMatch(r -> !r.get("status_code").equals(statusSrv.INUSE_STATUS));
        storage.setDeleteAc(canDelete);
    }
}
