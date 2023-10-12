package com.sap.internal.digitallab.packagehandling.manager;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package;
import com.sap.cds.Result;
import com.sap.internal.digitallab.packagehandling.repository.DeliveryCompanyRepository;
import com.sap.internal.digitallab.packagehandling.repository.PackageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PackageManager {
    private static final Logger LOGGER = LoggerFactory.getLogger("PackageManager_Logger");
    private final DeliveryCompanyRepository companyRepository;
    private final PackageRepository packageRepository;
    private final PackageStatusManager packageStatusManager;

    @Autowired
    public PackageManager(DeliveryCompanyRepository companyRepository, PackageRepository packageRepository, PackageStatusManager packageStatusManager) {
        this.companyRepository = companyRepository;
        this.packageRepository = packageRepository;
        this.packageStatusManager = packageStatusManager;
    }

    /**
     * Evaluates delete action control for a package.
     *
     * @param packageId id of the package to be evaluated.
     * @return true if a package is either new or confirmed, otherwise, false.
     */
    public boolean evalDeleteAc(String packageId) {
        String statusCode = readStatusCode(packageId);
        return statusCode.equals(packageStatusManager.NEW_STATUS_CODE) ||
                statusCode.equals(packageStatusManager.CONFIRMED_STATUS_CODE);
    }

    /**
     * Evaluates confirm action control for a package.
     *
     * @param packageId id of the package to be evaluated.
     * @return true if a package is new, otherwise, false.
     */
    public boolean evalConfirmAc(String packageId) {
        String statusCode = readStatusCode(packageId);
        return statusCode.equals(packageStatusManager.NEW_STATUS_CODE);
    }

    /**
     * Evaluates pickup action control for a package.
     *
     * @param packageId id of the package to be evaluated.
     * @return true if a package is confirmed, otherwise, false.
     */
    public boolean evalPickupAc(String packageId) {
        String statusCode = readStatusCode(packageId);
        return statusCode.equals(packageStatusManager.CONFIRMED_STATUS_CODE);
    }

    /**
     * Goes through all packages.
     * Updates reference to a non-existing company to null.
     */
    public void updateDeletedDeliveryCompany() {
        Result rowsOfPackages = packageRepository.selectAllPackages();
        rowsOfPackages.stream().forEach(p -> {
            if (!checkCompanyExistById(
                    p.get(Package.DELIVERY_COMPANY_ID).toString())) {
                LOGGER.info("Updated Package {} 's company to null", p);
                packageRepository.removeDeliveryCompanyById(
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
        Result rowsOfCompanies = companyRepository.selectById(companyId);
        return (rowsOfCompanies.stream().count() == 1);
    }

    /**
     * Reads the status code of a package from db.
     *
     * @param packageId id of the package to be read.
     * @return status code.
     */
    private String readStatusCode(String packageId) {
        Result pack = packageRepository.readById(packageId);
        return pack.single().get(Package.STATUS_CODE).toString();
    }
}
