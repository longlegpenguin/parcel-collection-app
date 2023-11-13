package com.sap.internal.digitallab.packagehandling.manager;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package;
import com.sap.cds.Result;
import com.sap.cds.Row;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.internal.digitallab.packagehandling.repository.DeliveryCompanyRepository;
import com.sap.internal.digitallab.packagehandling.repository.PackageRepository;
import com.sap.internal.digitallab.packagehandling.utility.EmailSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PackageManager {
    private static final Logger LOGGER = LoggerFactory.getLogger("PackageManager_Logger");
    private final DeliveryCompanyRepository companyRepo;
    private final PackageRepository packRepo;
    private final PackageStatusManager packStatusMgr;
    private final StorageSlotManager slotMgr;

    @Autowired
    public PackageManager(DeliveryCompanyRepository companyRepo, PackageRepository packRepo,
            PackageStatusManager packStatusMgr, StorageSlotManager slotMgr) {
        this.companyRepo = companyRepo;
        this.packRepo = packRepo;
        this.packStatusMgr = packStatusMgr;
        this.slotMgr = slotMgr;
    }

    /**
     * Evaluates delete action control for a package.
     *
     * @param packageId id of the package to be evaluated.
     * @return true if a package is either new or confirmed, otherwise, false.
     */
    public boolean evalDeleteAc(String packageId) {
        String statusCode = readStatusCode(packageId);
        return statusCode.equals(packStatusMgr.NEW_STATUS_CODE) ||
                statusCode.equals(packStatusMgr.CONFIRMED_STATUS_CODE);
    }

    /**
     * Evaluates confirm action control for a package.
     *
     * @param packageId id of the package to be evaluated.
     * @return true if a package is new, otherwise, false.
     */
    public boolean evalConfirmAc(String packageId) {
        String statusCode = readStatusCode(packageId);
        return statusCode.equals(packStatusMgr.NEW_STATUS_CODE);
    }

    /**
     * Evaluates pickup action control for a package.
     *
     * @param packageId id of the package to be evaluated.
     * @return true if a package is confirmed, otherwise, false.
     */
    public boolean evalPickupAc(String packageId) {
        String statusCode = readStatusCode(packageId);
        return statusCode.equals(packStatusMgr.CONFIRMED_STATUS_CODE);
    }

    /**
     * Confirms a package.
     * Updates status, confirmedAt and slot id.
     * Refreshes status for given slot.
     * Sends out email.
     *
     * @param slotId id of slot to store package.
     * @param packId id of package to confirm.
     */
    public void confirmPackage(String slotId, String packId) {
        packRepo.updateSlotIdById(slotId, packId);
        packRepo.updateStatusCodeById(packStatusMgr.CONFIRMED_STATUS_CODE, packId);
        packRepo.updateConfirmedTimeById(packId);
        slotMgr.refreshStatus(slotId);
        EmailSender.sendEmail(getPackageWithId(packId).get(Package.RECIPIENT_ID).toString() + " received a package");
    }

    /**
     * Sets package to picked up and fill the pickup time.
     * Refreshes status for given slot.
     * Sends out an email.
     *
     * @param packId id of package to be set.
     */
    public void pickupPackage(String packId) {
        packRepo.updateStatusCodeById(packStatusMgr.PICKUP_STATUS_CODE, packId);
        packRepo.updatePickedUpTimeById(packId);
        String slotId = packRepo.readById(packId).single().get(Package.SLOT_ID).toString();
        slotMgr.refreshStatus(slotId);
        EmailSender.sendEmail(getPackageWithId(packId).get(Package.RECIPIENT_ID).toString() + " picked up a package");
    }

    /**
     * Gets a package with its id.
     *
     * @param packId id of package to get.
     * @return Row (map) of the package.
     */
    public Row getPackageWithId(String packId) {
        return packRepo.readById(packId).single();
    }

    /**
     * Goes through all packages.
     * Updates reference to a non-existing company to null.
     */
    public void updateDeletedDeliveryCompany() {
        Result rowsOfPackages = packRepo.selectAllPackages();
        rowsOfPackages.stream().forEach(p -> {
            if (p.get(Package.DELIVERY_COMPANY_ID) != null &&
                !checkCompanyExistById(
                    p.get(Package.DELIVERY_COMPANY_ID).toString())) {
                LOGGER.info("Updated Package {} 's company to null", p);
                packRepo.removeDeliveryCompanyById(
                        p.get(Package.ID).toString());
            }
        });
    }

    /**
     * Check if a given company exists in the database.
     *
     * @param companyId company UUID to check.
     * @return true if exists.
     */
    private boolean checkCompanyExistById(String companyId) {
        Result rowsOfCompanies = companyRepo.selectById(companyId);
        return (rowsOfCompanies.stream().count() == 1);
    }

    /**
     * Reads the status code of a package from db.
     *
     * @param packageId id of the package to be read.
     * @return status code.
     */
    private String readStatusCode(String packageId) {
        Result pack = packRepo.readById(packageId);
        return pack.single().get(Package.STATUS_CODE).toString();
    }

    /**
     * Get the select cqn for given user and status is confirmed of the package
     * 
     * @param uname username
     * @return CqnSelect
     */
    public CqnSelect getFilterUserAndConfirmedStatusCqn(String uname) {
        return packRepo.getFilterUserAndStatusCqn(uname, packStatusMgr.CONFIRMED_STATUS_CODE);
    }
}
