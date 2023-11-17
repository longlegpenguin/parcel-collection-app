using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../../srv/services/StorageService';

/*
 * Storage list page
 */
annotate service.Storage with @(
    UI.SelectionFields: [
        bf,
        bd
    ],
    UI.FilterFacets   : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'ManagedFilter',
        Label : 'General Information',
        Target: '@UI.FieldGroup#AdminData',
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
            Value: totalPackages,
        },
        {
            $Type: 'UI.DataField',
            Value: currentPackages,
        },
        {
            $Type: 'UI.DataField',
            Value: bf,
            ![@UI.Hidden] ,
        },
        {
            $Type: 'UI.DataField',
            Value: bd,
            ![@UI.Hidden] ,
        }
    ],
);


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
    UI.FieldGroup #AdminData        : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: createdAt,
            },
            {
                $Type: 'UI.DataField',
                Value: createdBy,
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedAt,
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedBy,
            },
        ]
    },
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

annotate service.Storage with {
    ID                    @UI.HiddenFilter: true   @UI.Hidden: true;
    buildingFloor         @UI.HiddenFilter: true   @UI.Hidden: true;
    delete_ac             @UI.HiddenFilter: true   @UI.Hidden: true;
    update_ac             @UI.HiddenFilter: true   @UI.Hidden: true;
    map                   @UI.HiddenFilter: true   @UI.Hidden: true;
    totalPackages         @UI.HiddenFilter: true   @UI.Hidden: false;
    currentPackages       @UI.HiddenFilter: true   @UI.Hidden: false;
    locationInstructions  @UI.HiddenFilter: true   @UI.Hidden: false;
    name                  @UI.HiddenFilter: true   @UI.Hidden: false;
    createdAt             @UI.HiddenFilter: false  @UI.Hidden: false;
    createdBy             @UI.HiddenFilter: false  @UI.Hidden: false;
    modifiedAt            @UI.HiddenFilter: false  @UI.Hidden: false;
    modifiedBy            @UI.HiddenFilter: false  @UI.Hidden: false;
    bf                    @UI.HiddenFilter: false  @UI.Hidden: false;
    bd                    @UI.HiddenFilter: false  @UI.Hidden: false;
};

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
        $Type             : 'UI.DataField',
        Criticality       : status.criticality,
        Value             : status.name,
        ![@UI.Importance] : #High
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
