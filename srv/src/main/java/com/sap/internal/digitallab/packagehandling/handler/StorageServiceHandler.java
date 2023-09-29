package com.sap.internal.digitallab.packagehandling.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.SlotStatus;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.StorageSlot;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.StorageSlot_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.MassCreateContext;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.StorageService_;

import com.sap.cds.ql.Insert;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnInsert;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.ql.cqn.CqnSelectList;
import com.sap.cds.services.cds.ApplicationService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

@Component
@ServiceName(StorageService_.CDS_NAME)
public class StorageServiceHandler implements EventHandler {

    @Autowired
    PersistenceService db;

    // @Autowired
    // @Qualifier("StorageService")
    // private ApplicationService storageService;

    /**
     * Custom implementation for massCreate action
     * //(event = "massCreate", entity = StorageSlot_.CDS_NAME)
     * @param context MassCreateContext
     */
    @On 
    public void massCreateAction(MassCreateContext context) {

        String rowType = context.getRowType();
        String colType = context.getColType();
        int cnt = 0;

        for (int i = 0; i < context.getRow(); i++) {
            for (int j = 0; j < context.getCol(); j++) {

                String slotName = genSlotName(i, j, rowType, colType);
                String storage_ID = context.getStorage();

                if (!isSlotNameExist(slotName, storage_ID)) {
                    insertSlot(createSlot(slotName, storage_ID));
                    cnt++;
                }
            }
        }   
        context.setResult(cnt);
    }

    private String translateSlotNameCode(int code, String type) {
        return type.equals("C") ? (char)(code + 65) + "" : (code + "");
    }

    private boolean isSlotNameExist(String name, String storage) {
        CqnSelect select = Select.from(StorageSlot_.class).columns(s -> s.name()).where(s -> s.storage_ID().eq(storage));
        return db.run(select).stream().anyMatch(row-> row.get("name").equals(name));
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
}
