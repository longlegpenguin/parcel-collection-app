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

    @Autowired
    public PackageManager(DeliveryCompanyRepository companyRepository, PackageRepository packageRepository) {
        this.companyRepository = companyRepository;
        this.packageRepository = packageRepository;
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
}
