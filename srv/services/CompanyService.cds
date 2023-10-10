namespace com.sap.internal.digitallab.packagehandling.service;

using {com.sap.internal.digitallab.packagehandling.core as core} from '../../db/models/packagehandling/';
using {com.sap.internal.digitallab.packagehandling.common as common} from '../../db/models/common/';

/**
 * Service definition
 */
@path: 'CompanyService'
service CompanyService {

    entity DeliveryCompany as projection on core.DeliveryCompany;

}

/**
 * Input validation
 */
annotate core.DeliveryCompany with {
    name @mandatory;
};
