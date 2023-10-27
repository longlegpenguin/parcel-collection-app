package com.sap.internal.digitallab.packagehandling.handler;

import java.util.stream.Stream;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.pickupservice.Package_;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.services.cds.CdsReadEventContext;
import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.HandlerOrder;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.request.UserInfo;
import com.sap.internal.digitallab.packagehandling.manager.PackageManager;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.pickupservice.PickupContext;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.pickupservice.PickupService_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.pickupservice.Package;

@Component
@ServiceName(PickupService_.CDS_NAME)
public class PickupServiceHandler implements EventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger("PackageServiceHandler_logger");
    private final PackageManager packMgr;

    @Autowired
    public PickupServiceHandler(PackageManager packMgr) {
        this.packMgr = packMgr;
    }

    /**
     * Handler for end-user pickup action.
     * Sets package to picked up and fill the pickup time.
     *
     * @param context (packageId: UUID)
     * @result Package picked up.
     */
    @On
    public void pickupAction(PickupContext context) {
        String packId = context.getPackageId();
        packMgr.pickupPackage(packId);

        Package pack = Package.create();
        pack.putAll(packMgr.getPackageWithId(packId));
        context.setResult(pack);
    }

    /**
     * Before read event, filter only the packages of the current user and are
     * confrimed.
     * 
     * @param context read event context for getting the user.
     */
    @On(entity = Package_.CDS_NAME)
    @HandlerOrder(HandlerOrder.EARLY)
    public void onRead(CdsReadEventContext context) {
        UserInfo uInfo = context.getUserInfo();
        String uname = uInfo.getName();
        context.setCqn(
                packMgr.getFilterUserAndConfirmedStatusCqn(uname));
        LOGGER.info("{} was there", uname);
    }

    /**
     * Sets action controls on read.
     *
     * @param packages packages to set.
     */
    @After(event = { CqnService.EVENT_READ })
    public void afterReadPackage(Stream<Package> packages) {
        packages.forEach(p -> {
            String pid = p.getId();
            p.setPickupAc(packMgr.evalPickupAc(pid));
        });
        LOGGER.info("After read a package, updated ACs: ");
    }
}
