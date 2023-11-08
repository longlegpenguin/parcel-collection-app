using com.sap.internal.digitallab.packagehandling.service.PackageService as service from '../../../srv/services/PackageService';

annotate service.Package with {
    type   @Common.ValueListWithFixedValues;
    status @Common.ValueListWithFixedValues;
}
