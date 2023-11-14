using com.sap.internal.digitallab.packagehandling.service.PackageService as service from '../../../srv/services/PackageService';

annotate service.Package with {
    type        @Common.ValueListWithFixedValues;
    typeName    @Common.ValueListWithFixedValues;
    storageName @Common.ValueListWithFixedValues;
    status      @Common.ValueListWithFixedValues;
    dc          @Common.ValueListWithFixedValues;
    bf          @Common.ValueListWithFixedValues;
}


annotate service.Package with {
    storageName @(Common: {
        Text           : slot.storage.name,
        TextArrangement: #TextOnly,
        ValueList      : {
            Label         : 'Storage F',
            CollectionPath: 'Storage',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                ValueListProperty: 'name',
                LocalDataProperty: storageName
            }]
        }
    });
};

annotate service.Package with {
    typeName @(Common: {
        Text           : type.name,
        TextArrangement: #TextOnly,
        ValueList      : {
            Label         : 'Package Type',
            CollectionPath: 'PackageType',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                ValueListProperty: 'name',
                LocalDataProperty: typeName
            }]
        }
    });
};

annotate service.Package with {
    dc @(Common: {
        Text           : type.name,
        TextArrangement: #TextOnly,
        ValueList      : {
            Label         : 'Delivery Company',
            CollectionPath: 'DeliveryCompany',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                ValueListProperty: 'name',
                LocalDataProperty: dc
            }]
        }
    });
};

annotate service.Package with {
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
};
