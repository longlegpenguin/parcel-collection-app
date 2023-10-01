package com.sap.internal.digitallab.packagehandling.handler;

import java.util.List;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.SlotStatus;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.Storage;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.StorageSlot;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.StorageSlot_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.Storage_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.MassCreateContext;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.StorageService_;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package_;

import com.sap.cds.ql.Insert;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.Update;
import com.sap.cds.ql.cqn.CqnInsert;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.ql.cqn.CqnSelectList;
import com.sap.cds.ql.cqn.CqnUpdate;
import com.sap.cds.services.EventContext;
import com.sap.cds.services.cds.ApplicationService;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

@Component
@ServiceName(StorageService_.CDS_NAME)
public class StorageServiceHandler implements EventHandler {

    @Autowired
    PersistenceService db;

    private static final Logger LOGGER = LoggerFactory.getLogger("storage_logger");
    // @Autowired
    // @Qualifier("StorageService")
    // private ApplicationService storageService;

    /**
     * ------------------------------------------------------------------------------
     * Actions implementations
     * ------------------------------------------------------------------------------
     */

    /**
     * Custom implementation for massCreate action
     * 
     * @param context MassCreateContext
     */
    @On
    public void massCreateAction(MassCreateContext context) {

        LOGGER.atInfo().log("Called at mass create ");

        String rowType = context.getRowType();
        String colType = context.getColType();
        int cnt = 0;

        for (int i = 0; i < context.getRow(); i++) {
            for (int j = 0; j < context.getCol(); j++) {
                String slotName = genSlotName(i, j, rowType, colType);
                String storageId = context.getStorage();

                if (!isSlotNameExist(slotName, storageId)) {
                    insertSlot(createSlot(slotName, storageId));
                    cnt++;
                }
            }
        }
        context.setResult(cnt);
    }

    /**
     * ------------------------------------------------------------------------------
     * Virtual fields caculations
     * ------------------------------------------------------------------------------
     */

    @After(event = { CqnService.EVENT_READ })
    public void anyStorages(List<Storage> storages) {
        LOGGER.atInfo().log("Called at any storages");
        LOGGER.atInfo().log("{} storages is selected", storages.size());
    }

    @After(event = { CqnService.EVENT_READ, CqnService.EVENT_CREATE }, entity = StorageSlot_.CDS_NAME)
    public void calSlotTotalPackages(Stream<StorageSlot> slots) {
        slots.forEach(
                slot -> slot.setTotalPackages(
                        slot.getPackages() == null ? 0 : slot.getPackages().size()));

    }

    @After(event = { CqnService.EVENT_READ, CqnService.EVENT_CREATE })
    public void calTotalPackagesMultipleStorages(Stream<Storage> storages) {
        storages.forEach(this::calculateTotalPackagesSingleStorage);
    }

    @After(event = CqnService.EVENT_READ, entity = Storage_.CDS_NAME)
    public void calCurrentPackagesMultipleStorages(Stream<Storage> storages) {

        storages.forEach(storage -> {
            List<StorageSlot> slots = storage.getStorageSlot();
            storage.setCurrentPackages(
                    (slots == null)
                            ? 0
                            : calConfirmedInSlot(slots));
        });

    }

    /**
     * Calculate virtual field DeleteAc of Storages,
     * true if a all slots in the storage have DeleteAC true.
     *
     * @param storage list of Storages to be checked.
     */
    @After(event = {
            CqnService.EVENT_READ,
            CqnService.EVENT_CREATE })
    public void calStorageDeleteAc(List<Storage> storages) {
        storages.forEach(this::calSingleStorageDeleteAc);
    }

    /**
     * Calculate virtual field DeleteAc for slots,
     * true if slot status is not inuse.
     *
     * @param slots Stream<StorageSlot> slots to be checked.
     */
    @After(event = {
            CqnService.EVENT_READ,
            CqnService.EVENT_CREATE }, entity = StorageSlot_.CDS_NAME)
    public void calMultipleSlotsDeleteAc(List<StorageSlot> slots) {
        LOGGER.atInfo().log("Size of slots: {}", slots.size());
        slots.forEach(this::calSingleSlotDeleteAc);
    }

    /**
     * ------------------------------------------------------------------------------
     * Custom preprocessing, handling and postprocessing.
     * ------------------------------------------------------------------------------
     */
    /**
     * Throws exception if the storage being deleting contains non-empty slots.
     *
     * @param context EventContext
     */
    // @Before(event = CqnService.EVENT_DELETE, entity = Storage_.CDS_NAME)
    // public void validateStorageRemovable(EventContext context) {
    // // TODO
    // }

    // /**
    // * Deletes storage and its slots.
    // *
    // * @param context EventContext
    // */
    // @On(event = CqnService.EVENT_DELETE, entity = Storage_.CDS_NAME)
    // public void deleteStorage(EventContext context) {
    // // TODO
    // }

    // @After(event = CqnService.EVENT_READ, entity = Storage_.CDS_NAME)
    // public void calculateTotalPackages(List<Storage> storages) {
    // storages.stream().forEach(this::calculateTotalPackages);
    // }

    /**
     * ------------------------------------------------------------------------------
     * Helper functions
     * ------------------------------------------------------------------------------
     */

    private String translateSlotNameCode(int code, String type) {
        return type.equals("C") ? (char) (code + 65) + "" : (code + "");
    }

    private boolean isSlotNameExist(String name, String storage) {
        CqnSelect select = Select.from(StorageSlot_.class).columns(s -> s.name())
                .where(s -> s.storage_ID().eq(storage));
        return db.run(select).stream().anyMatch(row -> row.get("name").equals(name));
    }

    private String genSlotName(int rowCode, int colCode, String rowType, String colType) {
        return translateSlotNameCode(rowCode, rowType) + "-" + translateSlotNameCode(colCode, colType);
    }

    private StorageSlot createSlot(String slotName, String storage_ID) {
        StorageSlot slot = StorageSlot.create();
        slot.setName(slotName);
        slot.setStorageId(storage_ID);
        slot.setStatus(emptySlotStatus());
        return slot;
    }

    private SlotStatus emptySlotStatus() {
        SlotStatus slotStatus = SlotStatus.create();
        slotStatus.setCode("empty");
        return slotStatus;
    }

    private void insertSlot(StorageSlot slot) {
        CqnInsert insert = Insert.into(StorageSlot_.class).entry(slot);
        db.run(insert);
    }

    /**
     * Sets the given storage's total package number.
     * 
     * @param storage Storage
     */
    private void calculateTotalPackagesSingleStorage(Storage storage) {
        List<StorageSlot> slots = storage.getStorageSlot();
        if (slots == null) {
            storage.setTotalPackages(0);
        } else {
            int total = slots.stream().mapToInt(s -> s.getTotalPackages()).sum();
            storage.setTotalPackages(total);
            LOGGER.atInfo().log("{} has {} packages", storage.getId(), total);
        }
    }

    private int calConfirmedInSlot(List<StorageSlot> slots) {
        return slots.stream().mapToInt(slot -> {
            List<Package> packages = slot.getPackages();
            return (packages != null)
                    ? countConfirmedPackages(packages)
                    : 0;
        }).sum();
    }

    private int countConfirmedPackages(List<Package> packages) {
        return (int) (packages.stream()
                .filter(p -> p.getStatusCode().equals("confirmed"))
                .count());
    }

    private void calSingleSlotDeleteAc(StorageSlot slot) {
        slot.setDeleteAc(
                !(slot.getStatusCode().equals("inuse")));
    }

    private void calSingleStorageDeleteAc(Storage storage) {
        List<StorageSlot> slots = storage.getStorageSlot();
        if (slots != null) {
            boolean canDelete = slots.stream().allMatch(s -> s.getDeleteAc());
            storage.setDeleteAc(canDelete);
        } else {
            storage.setDeleteAc(true);
        }
    }
}
