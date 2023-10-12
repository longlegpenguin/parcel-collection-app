package com.sap.internal.digitallab.packagehandling.handler;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.packageservice.ConfirmContext;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.packageservice.Package;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.packageservice.PackageService_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.packageservice.PickupContext;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
@ServiceName(PackageService_.CDS_NAME)
public class PackageServiceHandler implements EventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger("PackageServiceHandler_logger");

    /*
     * ------------------------------------------------------------------------------
     * Actions
     * ------------------------------------------------------------------------------
     */
    @On
    public void confirmAction(ConfirmContext context) {
        // TODO Check the given IDs and slot ID. Set the status of the given packages to confirmed, set the confirmationTime, and set the slot to the selected one.
        CqnSelect param = context.getCqn();
        LOGGER.info("Confirm action received cQN: " + param.toString());
        context.setResult(false);
    }

    @On
    public void pickupAction(PickupContext context) {
        // TODO Check the given ID.  Sets the status to pickedup, set the pickedUpAt and pickedUpBy fields.
        context.setResult(false);
    }

    /*
     * ------------------------------------------------------------------------------
     * Custom preprocessing, handling and postprocessing.
     * ------------------------------------------------------------------------------
     */
    @After(event = {CqnService.EVENT_READ})
    public void afterReadPackage(Stream<Package> packages) {
        // TODO update 3 ACs.
        // delete ac Allowed only if the status is new or confirmed.
        // confirm ac  Only packages with new status can be set.
        // pick up ac Only status confirmed is supported.
    }

    @On(event = {CqnService.EVENT_UPDATE})
    public void onUpdatePackage(Stream<Package> packages) {
        // TODO prefill receptionist.
        LOGGER.info("On update a package, Get package: " + packages.toList().toString());
    }

    @After(event = {CqnService.EVENT_DELETE})
    public void afterDeletePackage(Stream<Package> packages) {
        // TODO If confirmed, an email notification is sent to the recipient.
        LOGGER.info("After delete a package");
    }
}
