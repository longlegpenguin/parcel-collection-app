using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../srv/services/StorageService';

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