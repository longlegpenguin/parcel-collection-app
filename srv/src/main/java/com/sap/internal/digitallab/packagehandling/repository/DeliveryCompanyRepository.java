package com.sap.internal.digitallab.packagehandling.repository;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.DeliveryCompany_;
import com.sap.cds.Result;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.persistence.PersistenceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DeliveryCompanyRepository {
    private static final Logger LOGGER = LoggerFactory.getLogger("DeliveryCompanyRepository_Logger");
    private final PersistenceService db;

    @Autowired
    public DeliveryCompanyRepository(PersistenceService db) {
        this.db = db;
    }

    /**
     * SELECT * FROM delivery_company WHERE id = $id;
     *
     * @param id company UUID to check.
     * @return resulting rows
     */
    public Result selectById(String id) {
        CqnSelect select = Select
                .from(DeliveryCompany_.class)
                .byId(id);
        return db.run(select);
    }
}
