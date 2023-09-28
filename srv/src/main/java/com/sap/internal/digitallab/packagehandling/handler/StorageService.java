package com.sap.internal.digitallab.packagehandling.handler;

import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.SlotStatus;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.StorageSlot;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.StorageSlot_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.AddContext;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.MassCreateContext;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.StorageService_;

import com.sap.cds.ql.Insert;
import com.sap.cds.ql.cqn.CqnInsert;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.persistence.PersistenceService;

@Component
@ServiceName(StorageService_.CDS_NAME)
public class StorageService implements EventHandler {

    @Autowired
    PersistenceService db;

    @On //(event = "massCreate", entity = StorageSlot_.CDS_NAME)
    public void massCreateAction(MassCreateContext context) {

        String rowType = context.getRowType();
        String colType = context.getColType();

        for (int i = 0; i < context.getRow(); i++) {
            for (int j = 0; j < context.getCol(); j++) {
                String slotName = translateSlotNameCode(i, rowType) + "-" + translateSlotNameCode(j, colType);
                StorageSlot slot = StorageSlot.create();
                slot.setName(slotName);
                slot.setStorageId(context.getStorage());
                slot.setStatus(SlotStatus.create());
                CqnInsert insert = Insert.into(StorageSlot_.class).entry(slot);
                db.run(insert);
                
            }
        }   
        context.setResult(201);
    }

    @On
    public void add(AddContext context) {
        context.setResult(201);
        context.setCompleted();
    }

    private String translateSlotNameCode(int code, String type) {
        return type.equals("C") ? (char)(code + 64) + "" : (code + "");
    }
}
