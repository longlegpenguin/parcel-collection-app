package com.sap.internal.digitallab.packagehandling.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.Result;
import com.sap.cds.ql.Insert;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnInsert;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.SlotStatus;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.StorageSlot;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.StorageSlot_;

@Component
public class StorageSlotRepository {

    @Autowired
    PersistenceService db;

    private static final Logger LOGGER = LoggerFactory.getLogger("slot_resp_logger");

    /**
     * INSERT INTO storageslot VALUES ($name, $status, $storageId);
     * @param name name of new slot
     * @param status SlotStatus of new slot
     * @param storageId String
     */
    public void insert(String name, SlotStatus status, String storageId) {
        StorageSlot slot = createSlot(name, storageId, status);
        CqnInsert insert = Insert.into(StorageSlot_.class).entry(slot);
        db.run(insert);
    }

    /**
     * SELECT name FROM storageslot where storage_id = $storageId;
     * 
     * @param storageId String
     * @return Result rows.
     */
    public Result selectNamesByStorageId(String storageId) {
        CqnSelect select = Select
                .from(StorageSlot_.class)
                .columns(StorageSlot_::name)
                .where(s -> s.storage_ID().eq(storageId));
        return db.run(select);
    }

    private StorageSlot createSlot(String slotName, String storageId, SlotStatus status) {
        StorageSlot slot = StorageSlot.create();
        slot.setName(slotName);
        slot.setStorageId(storageId);
        slot.setStatus(status);
        return slot;
    }
}
