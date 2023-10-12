package com.sap.internal.digitallab.packagehandling.utility;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {
    private static final Logger LOGGER = LoggerFactory.getLogger("EmailSender_Logger");

    public static void sendEmail(String content) {
        LOGGER.warn("Email function not implemented! {}", content);
    }
}
