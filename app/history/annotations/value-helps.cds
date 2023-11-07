using com.sap.internal.digitallab.packagehandling.service.HistoryService as service from '../../../srv/services/HistoryService';

annotate service.Package with {
    type   @Common.ValueListWithFixedValues;
    status @Common.ValueListWithFixedValues;
}
