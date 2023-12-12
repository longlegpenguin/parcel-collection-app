package com.sap.internal.digitallab.packagehandling.handler;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.packageservice.ConfirmContext;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.packageservice.Package;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.packageservice.PackageService_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.packageservice.PickupContext;
import com.sap.cds.services.ErrorStatuses;
import com.sap.cds.services.ServiceException;
import com.sap.cds.services.cds.CdsDeleteEventContext;
import com.sap.cds.services.cds.CdsUpdateEventContext;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.internal.digitallab.packagehandling.manager.PackageManager;
import com.sap.internal.digitallab.packagehandling.utility.EmailSender;
import com.sap.internal.digitallab.packagehandling.utility.MessageKeys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Stream;

@Component
@ServiceName(PackageService_.CDS_NAME)
public class PackageServiceHandler implements EventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger("PackageServiceHandler_logger");
    private final PackageManager packMgr;

    @Autowired
    public PackageServiceHandler(PackageManager packMgr) {
        this.packMgr = packMgr;
    }

    /*
     * ------------------------------------------------------------------------------
     * Actions
     * ------------------------------------------------------------------------------
     */

    /**
     * Handler for confirm action.
     *
     * @param context context of the confirmation action.
     */
    @On
    public void confirmAction(ConfirmContext context) {
        Collection<String> packageIds = context.getPackagesIds();
        String slotId = context.getSlotId();

        if (packageIds == null || slotId == null) {
            throw new ServiceException(ErrorStatuses.NOT_ACCEPTABLE, MessageKeys.MISSING_INPUT);
        }

        packageIds.forEach(pid -> packMgr.confirmPackage(slotId, pid));
        context.setResult(true);
        LOGGER.info("Confirm action received. packages: {} slot: {}", packageIds, slotId);
    }

    /**
     * Handler for receptionist pickup action.
     * Sets package to picked up and fill the pickup time.
     *
     * @param context (packageId: UUID)
     */
    @On
    public void pickupAction(PickupContext context) {
        String packId = context.getPackageId();
        packMgr.pickupPackage(packId);

        Package pack = Package.create();
        pack.putAll(packMgr.getPackageWithId(packId));
        context.setResult(pack);
    }

    /*
     * ------------------------------------------------------------------------------
     * Custom preprocessing, handling and postprocessing.
     * ------------------------------------------------------------------------------
     */

    /**
     * Sets action controls on read.
     *
     * @param packages packages to set.
     */
    @After(event = {CqnService.EVENT_READ})
    public void afterReadPackage(Stream<Package> packages) {
        packages.forEach(p -> {
            String pid = p.getId();
            p.setDeleteAc(packMgr.evalDeleteAc(pid));
            p.setConfirmAc(packMgr.evalConfirmAc(pid));
            p.setPickupAc(packMgr.evalPickupAc(pid));
        });
        LOGGER.info("After read a package, updated ACs: ");
    }

    /**
     * @param packages packages to update
     * @param context  context of event
     */
    @On(event = {CqnService.EVENT_UPDATE})
    public void onUpdatePackage(Stream<Package> packages, CdsUpdateEventContext context) {
        Set<String> userRoles = context.getUserInfo().getRoles();
        String userId = context.getUserInfo().getId();
        LOGGER.info("On update a package, Get package: {},\n Current user role: {},\n current user: {}, name: {}",
                packages.toList(), userRoles, userId, context.getUserInfo().getName());
    }

    /**
     * @param context context of the deletion event
     */
    @After(event = {CqnService.EVENT_DELETE})
    public void afterDeletePackage(CdsDeleteEventContext context) {
        EmailSender.sendEmail(" Removed a package");
        LOGGER.info("On delete a package Cqn {} ", context.getCqn());
        packMgr.afterDelete();
    }

}
