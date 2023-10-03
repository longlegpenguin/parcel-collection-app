package com.sap.internal.digitallab.packagehandling.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.Result;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package_;

@Component
public class PackageRespository {
    private static final Logger LOGGER = LoggerFactory.getLogger("PackageRespository_Logger");

    @Autowired
    PersistenceService db;

    /**
     * SELECT id, status_code FROM package where slot_id = $SlotId;
     * 
     * @param SlotId
     * @return Result rows
     */
    public Result readBySlotId(String slotId) {
        CqnSelect select = Select
                .from(Package_.class)
                .columns("ID", "status_code")
                .where(s -> s.slot_ID().eq(slotId));

        return db.run(select);
    }
}
