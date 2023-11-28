using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../../srv/services/StorageService';

annotate service.Storage with {
    bd @Common.ValueListWithFixedValues;
    bf @Common.ValueListWithFixedValues;
}

annotate service.Storage with {
    bf @(Common: {
        Text           : bf,
        TextArrangement: #TextOnly,
        ValueList      : {
            Label         : 'Building Floor',
            CollectionPath: 'BuildingFloor',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                ValueListProperty: 'name',
                LocalDataProperty: bf
            }]
        }
    });
    bd @(Common: {
        Text           : bd,
        TextArrangement: #TextOnly,
        ValueList      : {
            Label         : 'Building',
            CollectionPath: 'Building',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                ValueListProperty: 'name',
                LocalDataProperty: bd
            }]
        }
    });
};
