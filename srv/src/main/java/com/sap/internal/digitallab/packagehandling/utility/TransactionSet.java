package com.sap.internal.digitallab.packagehandling.utility;

import com.sap.cds.ql.Select;
import com.sap.cds.ql.cqn.CqnSelect;

import cds.gen.com.sap.internal.digitallab.packagehandling.core.Package_;
import cds.gen.com.sap.internal.digitallab.packagehandling.service.storageservice.StorageSlot;

public class TransactionSet {
    public static CqnSelect selectPackagesBySlotId(StorageSlot slot) {
        return Select
                .from(Package_.class)
                .columns("name", "status_code")
                .where(s -> s.slot_ID().eq(slot.getId()));
    }
}
