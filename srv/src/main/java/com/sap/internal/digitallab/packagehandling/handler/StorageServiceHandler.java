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
import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package_;

import com.sap.cds.Result;
import com.sap.cds.ql.Insert;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnInsert;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.reflect.CdsEntity;
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
    @Autowired
    @Qualifier(StorageService_.CDS_NAME)
    private ApplicationService storageService;

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

    @After(event = { CqnService.EVENT_READ }, entity = StorageSlot_.CDS_NAME)
    public void calSlotTotalPackages(Stream<StorageSlot> slots) {
        slots.forEach(
                slot -> slot.setTotalPackages(
                        cntTotalPackageInSingleSlot(slot.getId())));
    }

    @After(event = { CqnService.EVENT_READ }, entity = Storage_.CDS_NAME)
    public void calTotalPackagesMultipleStorages(List<Storage> storages) {
        storages.forEach(this::calTotalPackagesSingleStorage);
    }

    @After(event = CqnService.EVENT_READ, entity = Storage_.CDS_NAME)
    public void calCurrentPackagesMultipleStorages(List<Storage> storages) {
        storages.forEach(this::calConfirmedPackagesSingleStorage);
    }

    /**
     * ------------------------------------------------------------------------------
     * Virtual action control fields caculations
     * ------------------------------------------------------------------------------
     */
    /**
     * Calculate virtual field DeleteAc of Storages,
     * true if a all slots in the storage have DeleteAC true.
     *
     * @param storage list of Storages to be checked.
     */
    @After(event = {
            CqnService.EVENT_READ }, entity = Storage_.CDS_NAME)
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
            CqnService.EVENT_READ }, entity = StorageSlot_.CDS_NAME)
    public void calMultipleSlotsDeleteAc(List<StorageSlot> slots) {
        LOGGER.atInfo().log("Size of slots: {}", slots.size());
        slots.forEach(this::calSingleSlotDeleteAc);
    }

    /**
     * ------------------------------------------------------------------------------
     * Custom preprocessing, handling and postprocessing.
     * ------------------------------------------------------------------------------
     */

    // @On(event = CqnService.EVENT_DELETE)
    // public void anyDelete(EventContext context) {
    // CdsEntity slot = context.getTarget();
    // LOGGER.atInfo().log("On deletion occurs {}", slot);
    // }

    // @Before(event = CqnService.EVENT_DELETE)
    // public void anyBeforeDelete(EventContext context) {
    // LOGGER.atInfo().log("Before deletion occurs");
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
    private void calTotalPackagesSingleStorage(Storage storage) {

        Result rowsOfSlotsEntity = selectSlotsByStorateId(storage.getId());

        int total = rowsOfSlotsEntity
                .stream()
                .mapToInt(r -> cntTotalPackageInSingleSlot(r.get("ID").toString()))
                .sum();

        storage.setTotalPackages(total);
        LOGGER.atInfo().log("{} has {} packages", storage.getId(), total);
    }

    /**
     * Sets the given storage's total package number.
     * 
     * @param storage Storage
     */
    private void calConfirmedPackagesSingleStorage(Storage storage) {

        LOGGER.atInfo().log("Iamhere---------------------");

        Result rowsOfSlotsEntity = selectSlotsByStorateId(storage.getId());
        LOGGER.atInfo().log("Iamdone---------------------");

        int total = rowsOfSlotsEntity
                .stream()
                .mapToInt(r -> cntConfirmedInSingleSlot(r.get("ID").toString()))
                .sum();

        storage.setCurrentPackages(Integer.valueOf(total));
        LOGGER.atInfo().log("{} has {} packages", storage.getId(), total);
    }

    /**
     * Calculates the number of confirmed packages in a slot.
     * 
     * @param slotId UUID of the slot.
     * @return the number.
     */
    private int cntConfirmedInSingleSlot(String slotId) {

        Result rowsOfPackage = selectPackagesBySlotId(slotId);
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
    private int cntTotalPackageInSingleSlot(String slotId) {

        Result rowsOfPackage = selectPackagesBySlotId(slotId);
        return (int) rowsOfPackage
                .stream()
                .count();
    }

    private void calSingleSlotDeleteAc(StorageSlot slot) {

        slot.setDeleteAc(
                cntConfirmedInSingleSlot(slot.getId()) == 0);
    }

    private void calSingleStorageDeleteAc(Storage storage) {

        Result rows = selectSlotsByStorateId(storage.getId() + "");
        LOGGER.atInfo().log("slots is {}", rows);
        boolean canDelete = rows
                .stream()
                .allMatch(r -> !r.get("status_code").equals("inuse"));
        storage.setDeleteAc(canDelete);
    }

    private Result selectSlotsByStorateId(String storageId) {
        CqnSelect select = Select
                .from(StorageSlot_.class)
                .columns("ID", "status_code")
                .where(s -> s.storage_ID().eq(storageId));
        LOGGER.atInfo().log("SELECT!!!!!!!!!!!!!!!!!!!!!!");
        return db.run(select);
    }

    private Result selectPackagesBySlotId(String slotId) {
        CqnSelect select = Select
                .from(Package_.class)
                .columns("ID", "status_code")
                .where(s -> s.slot_ID().eq(slotId));

        return db.run(select);
    }
}
