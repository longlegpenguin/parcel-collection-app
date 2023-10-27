using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../srv/services/StorageService';

annotate service.Storage with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'locationInstructions',
            Value : locationInstructions,
        },
        {
            $Type : 'UI.DataField',
            Label : 'map',
            Value : map,
        },
        {
            $Type : 'UI.DataField',
            Label : 'totalPackages',
            Value : totalPackages,
        },
        {
            $Type : 'UI.DataField',
            Label : 'currentPackages',
            Value : currentPackages,
        },
    ]
);
annotate service.Storage with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'locationInstructions',
                Value : locationInstructions,
            },
            {
                $Type : 'UI.DataField',
                Label : 'map',
                Value : map,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalPackages',
                Value : totalPackages,
            },
            {
                $Type : 'UI.DataField',
                Label : 'currentPackages',
                Value : currentPackages,
            },
            {
                $Type : 'UI.DataField',
                Label : 'delete_ac',
                Value : delete_ac,
            },
            {
                $Type : 'UI.DataField',
                Label : 'update_ac',
                Value : update_ac,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
