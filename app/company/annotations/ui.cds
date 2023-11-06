using com.sap.internal.digitallab.packagehandling.service.CompanyService as service from '../../../srv/services/CompanyService';


annotate service.DeliveryCompany with @(
    UI.FilterFacets: [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'Generatedinfo',
            Label : 'General Information',
            Target: '@UI.FieldGroup#Company',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'AdministrativeData',
            Label : 'Administrative Data',
            Target: '@UI.FieldGroup#AdministrativeData',
        },
    ],
    UI.LineItem    : [
        {
            $Type             : 'UI.DataField',
            Value             : logo,
            ![@UI.Importance] : #High
        },
        {
            $Type: 'UI.DataField',
            Value: name,
        },
        {
            $Type: 'UI.DataField',
            Value: createdAt,
        },
        {
            $Type: 'UI.DataField',
            Value: createdBy,
        }
    ]
);

annotate service.DeliveryCompany with {
    logo @odata.mediaContentType: 'image/jpeg'
         @Common.Text           : name  @Core.MediaType: 'image/jpeg';
};

annotate service.DeliveryCompany with @(

UI.Facets: [
    {
        $Type : 'UI.ReferenceFacet',
        ID    : 'Company',
        Label : 'General Information',
        Target: '@UI.FieldGroup#Company',
    },
    {
        $Type : 'UI.ReferenceFacet',
        ID    : 'AdministrativeData',
        Label : 'Administrative Data',
        Target: '@UI.FieldGroup#AdministrativeData',
    },
]);

annotate service.DeliveryCompany with @(
    UI.FieldGroup #Company           : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type             : 'UI.DataField',
                Value             : logo,
                ![@UI.Importance] : #High
            },
            {
                $Type: 'UI.DataField',
                Value: name,
            }
        ]
    },
    UI.FieldGroup #AdministrativeData: {
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
    }
);
