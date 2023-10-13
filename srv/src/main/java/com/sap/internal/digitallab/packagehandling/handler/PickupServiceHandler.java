package com.sap.internal.digitallab.packagehandling.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.ql.Select;
import com.sap.cds.services.cds.CdsReadEventContext;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.HandlerOrder;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.request.UserInfo;
import com.sap.internal.digitallab.packagehandling.manager.PackageManager;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.pickupservice.PickupContext;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.pickupservice.PickupService_;;

@Component
@ServiceName(PickupService_.CDS_NAME)
public class PickupServiceHandler  implements EventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger("PackageServiceHandler_logger");
    private final PackageManager packMgr;

    @Autowired
    public PickupServiceHandler(PackageManager packMgr) {
        this.packMgr = packMgr;
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
        // packMgr.pickupPackage(packId);

        // Package pack = Package.create();
        // pack.putAll(packMgr.getPackageWithId(packId));
        // context.setResult(pack);
    }

    @Before
    @HandlerOrder(HandlerOrder.EARLY)
    public void beforeRead(CdsReadEventContext context) {
        UserInfo uInfo = context.getUserInfo();
        String uname = uInfo.getName();
        context.setCqn(Select.from(Package_.class).where(p -> p.status_code().eq("confirmed").and(p.recipient().eq(uname))));
    }
}
