using com.sap.internal.digitallab.packagehandling.service.HistoryService as service from '../../../srv/services/HistoryService';

annotate service.Package with {
    typeName    @Common.ValueListWithFixedValues;
    dc          @Common.ValueListWithFixedValues;
    statusName  @Common.ValueListWithFixedValues;
}

annotate service.Package with {
    statusName @(Common: {
        Text           : status.name,
        TextArrangement: #TextOnly,
        ValueList      : {
            Label         : 'Package Status',
            CollectionPath: 'PackageStatus',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                ValueListProperty: 'name',
                LocalDataProperty: statusName
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
