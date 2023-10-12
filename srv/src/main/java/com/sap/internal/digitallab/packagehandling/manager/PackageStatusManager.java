package com.sap.internal.digitallab.packagehandling.manager;

import org.springframework.stereotype.Component;

@Component
public class PackageStatusManager {
    public final String NEW_STATUS_CODE = "new";
    public final String CONFIRMED_STATUS_CODE = "confirmed";
    public final String PICKUP_STATUS_CODE = "pickedup";
}
