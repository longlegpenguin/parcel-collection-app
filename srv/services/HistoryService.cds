namespace com.sap.internal.digitallab.packagehandling.service;

using {com.sap.internal.digitallab.packagehandling.core as core} from '../../db/models/packagehandling/';
using {com.sap.internal.digitallab.packagehandling.common as common} from '../../db/models/common/';

/**
 * Service definition
 */
@path: 'HistoryService'
service HistoryService {

    @readonly
    entity Package         as projection on core.Package where recipient.ID = $user;

    @readonly
    entity PackageType     as projection on core.PackageType;

    @readonly
    entity PackageStatus   as projection on core.PackageStatus;

    @readonly
    entity DeliveryCompany as projection on core.DeliveryCompany;

    @readonly
    entity User            as projection on common.User;

    @readonly
    entity Receptionist    as projection on common.Receptionist;


}
