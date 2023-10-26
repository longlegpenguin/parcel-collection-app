package com.sap.internal.digitallab.packagehandling.handler;

import com.sap.cds.services.cds.CdsCreateEventContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.sap.cds.services.cds.CqnService;
import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.HandlerOrder;

import cds.gen.com.sap.internal.digitallab.packagehandling.service.registrationservice.RegistrationService_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.registrationservice.Package;

import java.util.Set;

@Component
@ServiceName(RegistrationService_.CDS_NAME)
public class RegistrationServiceHandler implements EventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger("StorageServiceHandler_logger");

    @Before(event = { CqnService.EVENT_CREATE })
    @HandlerOrder(HandlerOrder.EARLY)
    public void beforeCreate(Package pack, CdsCreateEventContext context) {
        pack.setStatusCode("new");
        Set<String> userRoles = context.getUserInfo().getRoles();
        String userId = context.getUserInfo().getId();
        if (userRoles.contains("Receptionist")) {
            pack.setReceptionist(userId);
        }
        LOGGER.info("Creating package: {}", pack);
    }
}
