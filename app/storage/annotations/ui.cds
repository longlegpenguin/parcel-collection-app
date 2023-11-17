using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../../srv/services/StorageService';

/*
 * Storage list page
 */
annotate service.Storage with @(
    UI.SelectionFields: [
        buildingFloor.name,
        buildingFloor.building.name
    ],
    UI.FilterFacets   : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#StorageShowFields',
    }],
    UI.LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: name,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Location',
            Value: buildingFloor.name,
        },
        {
            $Type: 'UI.DataField',
            Value: locationInstructions,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Total Number of Packages',
            Value: totalPackages,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Current Utilization',
            Value: currentPackages,
        },
        {
            $Type         : 'UI.DataFieldWithIntentBasedNavigation',
            Value         : ID,
            Action        : 'manage',
            Mapping : [
                {
                    $Type : 'Common.SemanticObjectMappingType',
                    LocalProperty : ID,
                    SemanticObjectProperty : 'slot_ID',
                },
            ],
        },
    ],
);

annotate service.Storage with {
    totalPackages @Common.SemanticObject: 'Packages'
};


annotate service.BuildingFloor with {
    name @Common.Label: 'Building Floor';
};

annotate service.Building with {
    name @Common.Label: 'Building';
};


/*
 * Storage object detail page
 */
annotate service.Storage with @(
    UI.FieldGroup #StorageShowFields: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: name,
            },
            {
                $Type: 'UI.DataField',
                Value: locationInstructions,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Map',
                Value: 'Open'
            },
            {
                $Type: 'UI.DataField',
                Label: 'Building Floor',
                Value: buildingFloor.name,
            },
            {
                $Type: 'UI.DataField',
                Value: totalPackages,
            },
            {
                $Type: 'UI.DataField',
                Value: currentPackages,
            },
        ],
    },
    UI.Facets                       : [{
        $Type : 'UI.ReferenceFacet',
        Label : '{_i18n>Slots}',
        Target: 'storageSlot/@UI.LineItem'
    }]
);


/*
 * Slot list page.
 */
annotate service.StorageSlot with @UI: {LineItem: [
    {
        $Type: 'UI.DataField',
        Value: name,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total Number of Packages',
        Value: totalPackages,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Status',
        Value: status_code,
    },
], };

/**
 * Slot object page
 */
annotate service.StorageSlot with @(
    UI.FieldGroup #SlotInputFields: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: name,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Storage',
                Value: storage.name,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Status',
                Value: status.name,
            },
        ],
    },
    UI.Facets                     : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'SlotFacet',
        Label : 'General Information',
        Target: '@UI.FieldGroup#SlotInputFields',
    }, ]
);


/*
 * Storage object page
 */
annotate service.Storage with @(

UI.HeaderInfo: {
    TypeName      : 'Storage',
    TypeNamePlural: 'Storages',
    ImageUrl      : '',
    Title         : {
        $Type: 'UI.DataField',
        Value: name
    },
    Description   : {
        $Type: 'UI.DataField',
        Value: locationInstructions
    }
});

annotate service.Storage with @(

UI.HeaderFacets: [
    {
        $Type : 'UI.ReferenceFacet',
        Label : '',
        Target: '@UI.FieldGroup#ObjHeaderInfo'
    },
    {
        $Type : 'UI.ReferenceFacet',
        Label : '',
        Target: '@UI.FieldGroup#ObjHeaderCalculated'
    },
    {
        $Type : 'UI.ReferenceFacet',
        Label : '',
        Target: '@UI.FieldGroup#ObjHeaderCalculated2'
    }
]);


annotate service.Storage with @(UI.FieldGroup #ObjHeaderInfo: {Data: [
    {
        $Type: 'UI.DataField',
        Label: 'Location',
        Value: buildingFloor.name,
    },
    {
        $Type: 'UI.DataFieldWithUrl',
        Label: 'Map',
        Value: 'Open',
        Url  : map
    }
]});


annotate service.Storage with @(UI.FieldGroup #ObjHeaderCalculated: {Data: [{
    $Type: 'UI.DataField',
    Label: 'Total Utilization',
    Value: totalPackages,
}]});

annotate service.Storage with @(UI.FieldGroup #ObjHeaderCalculated2: {Data: [{
    $Type: 'UI.DataField',
    Label: 'Current Utilization',
    Value: currentPackages,
}, ]});
