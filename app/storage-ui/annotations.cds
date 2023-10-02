using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../srv/services/StorageService';

annotate service.Storage with @odata.draft.enabled;
annotate service.BuildingFloor with @cds.odata.valuelist;
annotate service.Storage with @cds.odata.valuelist;

// annotate service.StorageSlot with @odata.draft.enabled;
annotate service.Storage with @(Capabilities.DeleteRestrictions: {Deletable: delete_ac, //Search-Term: #DynamicCRUD
}, );
annotate service.StorageSlot with @(Capabilities.DeleteRestrictions: {Deletable: delete_ac, //Search-Term: #DynamicCRUD
}, );

/*
 * Storage list page
 */
annotate service.Storage with @(
    UI.SelectionFields: [buildingFloor],
    UI.LineItem       : [
        {
            $Type: 'UI.DataField',
            Label: 'Name',
            Value: name,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Location',
            Value: buildingFloor,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Map',
            Value: map,
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
                Label: 'map',
                Value: map,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Building Floor',
                Value: buildingFloor,
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
    UI.Facets                       : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet1',
            Label : 'General Information',
            Target: '@UI.FieldGroup#StorageShowFields',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>Slots}',
            Target: 'storageSlot/@UI.LineItem'
        }
    ]
);

/*
 * Slot list page.
 */
annotate service.StorageSlot with @UI: {LineItem: [
    {
        $Type : 'UI.DataFieldForAction',
        Action: 'com.sap.internal.digitallab.packagehandling.service.StorageService.EntityContainer/massCreate',
        Label : '{i18n>Mass Create}'
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
                Value: storage_ID,
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
// annotate service.RootEntities with @(

// );
