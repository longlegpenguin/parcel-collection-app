package com.sap.internal.digitallab.packagehandling.handler;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.companyservice.CompanyService_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.companyservice.DeliveryCompany;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.companyservice.DeliveryCompany_;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.internal.digitallab.packagehandling.manager.PackageManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
@ServiceName(CompanyService_.CDS_NAME)
public class CompanyServiceHandler implements EventHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger("CompanyServiceHandler_logger");
    private final PackageManager packageManager;

    @Autowired
    public CompanyServiceHandler(PackageManager packageManager) {
        this.packageManager = packageManager;
    }

    /*
     * ------------------------------------------------------------------------------
     * Custom preprocessing, handling and postprocessing.
     * ------------------------------------------------------------------------------
     */

    /**
     * After DELETE request of a company, updates packages so the no longer exists company are repleaced by null.
     *
     * @param companies DeliveryCompany stream
     */
    @After(event = {CqnService.EVENT_DELETE}, entity = DeliveryCompany_.CDS_NAME)
    public void afterDeleteCompany(Stream<DeliveryCompany> companies) {
        packageManager.updateDeletedDeliveryCompany();
        LOGGER.info("After delete a company:: packages are updated");
    }
}
