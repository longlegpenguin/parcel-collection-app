package com.sap.internal.digitallab.packagehandling.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.services.persistence.PersistenceService;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.Result;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.StorageSlot_;

@Component
public class StorageRespository /* extends BaseRepository */ {

    @Autowired
    PersistenceService db;

    private static final Logger LOGGER = LoggerFactory.getLogger("storage_resp_logger");

    public Result selectSlotsById(String id) {
        CqnSelect select = Select
                .from(StorageSlot_.class)
                .columns("ID", "status_code")
                .where(s -> s.storage_ID().eq(id));
        return db.run(select);
    }
}
