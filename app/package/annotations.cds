using com.sap.internal.digitallab.packagehandling.service.PackageService as service from '../../srv/services/PackageService';

annotate service.Package with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : recipient,
        },
        {
            $Type : 'UI.DataField',
            Label : 'comfirmationTime',
            Value : comfirmationTime,
        },
        {
            $Type : 'UI.DataField',
            Label : 'pickupTime',
            Value : pickupTime,
        },
        {
            $Type : 'UI.DataField',
            Label : 'type_code',
            Value : type_code,
        },
        {
            $Type : 'UI.DataField',
            Label : 'status_code',
            Value : status_code,
        },
    ]
);
annotate service.Package with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : recipient,
            },
            {
                $Type : 'UI.DataField',
                Label : 'comfirmationTime',
                Value : comfirmationTime,
            },
            {
                $Type : 'UI.DataField',
                Label : 'pickupTime',
                Value : pickupTime,
            },
            {
                $Type : 'UI.DataField',
                Label : 'type_code',
                Value : type_code,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status_code',
                Value : status_code,
            },
            {
                $Type : 'UI.DataField',
                Value : receptionist,
            },
            {
                $Type : 'UI.DataField',
                Label : 'comment',
                Value : comment,
            },
            {
                $Type : 'UI.DataField',
                Label : 'delete_ac',
                Value : delete_ac,
            },
            {
                $Type : 'UI.DataField',
                Label : 'confirm_ac',
                Value : confirm_ac,
            },
            {
                $Type : 'UI.DataField',
                Label : 'pickup_ac',
                Value : pickup_ac,
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
