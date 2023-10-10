package com.sap.internal.digitallab.packagehandling.repository;

import com.sap.cds.ql.Update;
import com.sap.cds.ql.cqn.CqnUpdate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.Result;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.persistence.PersistenceService;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package_;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package;

@Component
public class PackageRepository {
    private static final Logger LOGGER = LoggerFactory.getLogger("PackageRepository_Logger");
    private final PersistenceService db;

    @Autowired
    public PackageRepository(PersistenceService db) {
        this.db = db;
    }

    /**
     * SELECT id, status_code FROM package where slot_id = $SlotId;
     *
     * @param slotId slot id filter condition
     * @return Result rows
     */
    public Result readBySlotId(String slotId) {
        CqnSelect select = Select
                .from(Package_.class)
                .columns("ID", "status_code")
                .where(p -> p.slot_ID().eq(slotId));

        return db.run(select);
    }

    /**
     * SELECT id, delivery_company_id FROM package;
     *
     * @return rows of selected.
     */
    public Result selectAllPackages() {
        CqnSelect select = Select
                .from(Package_.class)
                .columns(Package.ID, Package.DELIVERY_COMPANY_ID);
        return db.run(select);
    }

    /**
     * Removes reference to delivery company of given package and set to null.
     *
     * @param packageId id of the package which company to be removed.
     */
    public void removeDeliveryCompanyById(String packageId) {
        CqnUpdate update = Update
                .entity(Package_.class)
                .data(Package.DELIVERY_COMPANY, null)
                .where(p -> p.ID().eq(packageId));
        db.run(update);
    }
}
