package com.sap.internal.digitallab.packagehandling.repository;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package;
import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package_;
import com.sap.cds.Result;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.Update;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.ql.cqn.CqnUpdate;
import com.sap.cds.services.persistence.PersistenceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

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

    /**
     * SELECT * FROM package where ID = $packageId;
     * 
     * @param packageId id of package to read
     * @return single row of result of select.
     */
    public Result readById(String packageId) {
        CqnSelect select = Select
                .from(Package_.class)
                .byId(packageId);
        return db.run(select);
    }

    /**
     * Updates a package entry with nue slot id.
     *
     * @param slotId id of slot to fill in.
     * @param packId id of package to change the slot id.
     */
    public void updateSlotIdById(String slotId, String packId) {
        CqnUpdate update = Update
                .entity(Package_.class)
                .data(Package.SLOT_ID, slotId)
                .where(p -> p.ID().eq(packId));
        db.run(update);
    }

    /**
     * Updates a package entry with nue slot id.
     *
     * @param statusCode status code to fill in.
     * @param packId     id of package to update.
     */
    public void updateStatusCodeById(String statusCode, String packId) {
        CqnUpdate update = Update
                .entity(Package_.class)
                .data(Package.STATUS_CODE, statusCode)
                .byId(packId);
        db.run(update);
    }

    /**
     * Updates a package's confirmation time with now.
     *
     * @param packId id of package to update.
     */
    public void updateConfirmedTimeById(String packId) {
        CqnUpdate update = Update
                .entity(Package_.class)
                .data(Package.COMFIRMATION_TIME, new Timestamp(System.currentTimeMillis()))
                .byId(packId);
        db.run(update);
    }

    /**
     * Updates a package's picked-up time with now.
     *
     * @param packId id of package to update.
     */
    public void updatePickedUpTimeById(String packId) {
        CqnUpdate update = Update
                .entity(Package_.class)
                .data(Package.PICKUP_TIME, new Timestamp(System.currentTimeMillis()))
                .byId(packId);
        db.run(update);
    }

    /**
     * Get the select cqn for given user and status of the package
     * 
     * @param uname      user name
     * @param statusCode status code of the package
     * @return CqnSelect SELECT * FROM package WHERE recipient = $uname AND
     *         status_code = $statusCode;
     */
    public CqnSelect getFilterUserAndStatusCqn(String uname, String statusCode) {
        return Select.from(Package_.class)
                .where(
                        p -> p.status_code().eq(statusCode)
                                .and(p.recipient().eq(uname)));
    }
}
