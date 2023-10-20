package com.sap.internal.digitallab.packagehandling.manager;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.StorageSlot;
import com.sap.cds.Result;
import com.sap.internal.digitallab.packagehandling.repository.PackageRepository;
import com.sap.internal.digitallab.packagehandling.repository.StorageSlotRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StorageSlotManager {

    private static final Logger LOGGER = LoggerFactory.getLogger("StorageSlotManager_LOGGER");

    SlotStatusManager slotStatusMgr;
    StorageSlotRepository slotResp;
    PackageRepository packageResp;

    @Autowired
    public StorageSlotManager(SlotStatusManager slotStatusMgr, StorageSlotRepository slotResp, PackageRepository packageResp) {
        this.slotResp = slotResp;
        this.slotStatusMgr = slotStatusMgr;
        this.packageResp = packageResp;
    }

    /**
     * Evaluates and updates virtual field DeleteAc for slots,
     * true if slot status is not inuse.
     *
     * @param slot StorageSlot slot to be checked.
     */
    public void updateDeleteAc(StorageSlot slot) {
        slot.setDeleteAc(cntConfirmedPackagesNumber(slot.getId()) == 0);
    }

    /**
     * Evaluates and updates total package number virtual fields of given slot.
     *
     * @param slot StorageSlot
     */
    public void updateTotalPackageVf(StorageSlot slot) {
        slot.setTotalPackages(
                cntTotalPackagesNumber(slot.getId()));
    }

    public int massCreate(String rowType, int rows, String colType, int cols, String storageId) {
        int cnt = 0;

        if (rowType.equals(colType)) {
            throw new IllegalArgumentException("Row type and Col type cannot be the same");
        } else if (!(
                (rowType.equals("C") || rowType.equals("N")) &&
                        (colType.equals("C") || colType.equals("N")))) {
            throw new IllegalArgumentException("Invalid type code");
        }
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                String slotName = genSlotName(i, j, rowType, colType);
                if (!isSlotNameExist(slotName, storageId)) {
                    try {
                        slotResp.insert(slotName, slotStatusMgr.emptySlotStatus(), storageId);
                        cnt++;
                    } catch (Exception e) {
                        LOGGER.info("Skipped slot {} creation because name exists.", slotName);
                    }
                }
            }
        }
        return cnt;
    }

    /**
     * Calculates the number of confirmed packages in a slot.
     *
     * @param slotId UUID of the slot.
     * @return the number.
     */
    public int cntConfirmedPackagesNumber(String slotId) {

        Result rowsOfPackage = packageResp.readBySlotId(slotId);
        return (int) rowsOfPackage
                .stream()
                .filter(r -> r.get("status_code").equals("confirmed"))
                .count();
    }

    /**
     * Calculates the total number of packages in a slot.
     *
     * @param slotId UUID of the slot.
     * @return the number.
     */
    public int cntTotalPackagesNumber(String slotId) {

        Result rowsOfPackage = packageResp.readBySlotId(slotId);
        return (int) rowsOfPackage
                .stream()
                .count();
    }

    /**
     * Refreshes the status of the slot according to no. of current packages.
     * empty if = 0, in use if > 0
     *
     * @param slotId id of slot to reset.
     */
    public void refreshStatus(String slotId) {
        int noOfCurrentPacks = cntConfirmedPackagesNumber(slotId);
        if (noOfCurrentPacks == 0) {
            slotResp.updateStatusCodeById(slotStatusMgr.EMPTY_STATUS, slotId);
        } else if (noOfCurrentPacks > 0) {
            slotResp.updateStatusCodeById(slotStatusMgr.INUSE_STATUS, slotId);
        }
        LOGGER.info("Refreshed status, no of current packs: {}, slot={}", noOfCurrentPacks, slotId);
    }

    private String translateSlotNameCode(int code, String type) {
        return type.equals("C") ? (char) (code + 65) + "" : (code + "");
    }

    /**
     * Check if the slot name exists in a storage.
     *
     * @param name      name of slot
     * @param storageId UUID
     * @return true if exist
     */
    private boolean isSlotNameExist(String name, String storageId) {
        return slotResp.selectNamesByStorageId(storageId)
                .stream()
                .anyMatch(row -> row.get("name").equals(name));
    }

    /**
     * Generate slot's name.
     *
     * @param rowCode ordinal number for row
     * @param colCode ordinal number for column
     * @param rowType C for character, N for number
     * @param colType C for character, N for number
     * @return name of slot
     */
    private String genSlotName(int rowCode, int colCode, String rowType, String colType) {
        return translateSlotNameCode(rowCode, rowType) + " - " + translateSlotNameCode(colCode, colType);
    }
}
