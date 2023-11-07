
using com.sap.internal.digitallab.packagehandling.service.HistoryService as service from '../../../srv/services/HistoryService';

annotate service.Package with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : recipient,
        },
        {
            $Type : 'UI.DataField',
            Value : comfirmationTime,
        },
        {
            $Type : 'UI.DataField',
            Value : pickupTime,
        },
        {
            $Type : 'UI.DataField',
            Value : type_code,
        },
        {
            $Type : 'UI.DataField',
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
                Value : comfirmationTime,
            },
            {
                $Type : 'UI.DataField',
                Value : pickupTime,
            },
            {
                $Type : 'UI.DataField',
                Value : type_code,
            },
            {
                $Type : 'UI.DataField',
                Value : status_code,
            },
            {
                $Type : 'UI.DataField',
                Value : receptionist,
            },
            {
                $Type : 'UI.DataField',
                Value : comment,
            },
            {
                $Type : 'UI.DataField',
                Value : delete_ac,
            },
            {
                $Type : 'UI.DataField',
                Value : confirm_ac,
            },
            {
                $Type : 'UI.DataField',
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
