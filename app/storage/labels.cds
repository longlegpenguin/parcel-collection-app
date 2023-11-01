using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../srv/services/StorageService';


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
            Label: 'Name',
            Value: name,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Location',
            Value: buildingFloor.name,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Location Instructions',
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
    ]
);

annotate service with @Consumption.valueHelpDefinition: [{entity: {
    name   : 'BuildingFloor',
    element: 'name'
}}];

annotate service.Storage with {
    buildingFloor @ValueListMapping: {
        Label         : 'Building floor help',
        CollectionPath: 'BuildingFloor',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                ValueListProperty: 'name',
                LocalDataProperty: buildingFloor.name
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'ID'
            }
        ]
    }
};

annotate service.BuildingFloor with {
    name @Common.Label: 'Building Floor';
};

annotate service.Building with {
    name @Common.Label: 'Building';
};

annotate service.Storage with @(UI.FieldGroup #Basics: {
    $Type: 'UI.FieldGroupType',
    Data : [
        {
            $Type: 'UI.DataField',
            Label: 'Building Floor',
            Value: buildingFloor.name,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Building',
            Value: buildingFloor.building.name,
        },
    ],
});

/*
 * Storage object detail page
 */
annotate service.Storage with @(
    UI.FieldGroup #StorageShowFields: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'name',
                Value: name,
            },
            {
                $Type: 'UI.DataField',
                Label: 'locationInstructions',
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
                Label: 'totalPackages',
                Value: totalPackages,
            },
            {
                $Type: 'UI.DataField',
                Label: 'currentPackages',
                Value: currentPackages,
            },
        ],
    },
    UI.Facets                       : [{
        $Type : 'UI.ReferenceFacet',
        Label : '{i18n>Slots}',
        Target: 'storageSlot/@UI.LineItem'
    }]
);


/*
 * Slot list page.
 */
annotate service.StorageSlot with @UI: {LineItem: [
    {
        $Type : 'UI.DataFieldForAction',
        Action: 'com.sap.internal.digitallab.packagehandling.service.StorageService.EntityContainer/massCreate',
        Label : '{i18n>MassCreate}'
    },
    {
        $Type: 'UI.DataField',
        Label: 'Name',
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
                Label: 'Name',
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
                Value: status_code,
            },
        ],
    },
    UI.Facets                     : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#SlotInputFields',
    }, ]
);
