using com.sap.internal.digitallab.packagehandling.service.CompanyService as service from '../../../srv/services/CompanyService';


annotate service.DeliveryCompany with @(
    UI.SelectionFields: [
        createdBy,
        createdAt,
        modifiedBy,
        modifiedAt
    ],
    UI.FilterFacets   : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'AdministrativeData',
        Label : 'Administrative Data',
        Target: '@UI.FieldGroup#AdministrativeData',
    }, ],
    UI.LineItem       : [
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
            Value: name,
            ![@UI.Hidden]
        }
    ]
);

annotate service.DeliveryCompany with {
    name        @UI.Hidden: false  @UI.HiddenFilter: true;
    createdAt   @UI.Hidden: false  @UI.HiddenFilter: false;
    createdBy   @UI.Hidden: false  @UI.HiddenFilter: false;
    modifiedAt  @UI.Hidden: false  @UI.HiddenFilter: false;
    modifiedBy  @UI.Hidden: false  @UI.HiddenFilter: false;
    ID          @UI.Hidden: true   @UI.HiddenFilter: true;
    logo        @UI.Hidden: true   @UI.HiddenFilter: true;
};

annotate service.DeliveryCompany with @(
    UI.HeaderInfo  : {
        TypeName      : 'Delivery Company',
        TypeNamePlural: 'Delivery Companies',
        ImageUrl      : '',
        Title         : {
            $Type: 'UI.DataField',
            Value: name
        }
    },
    // UI.HeaderFacets: [{
    //     $Type : 'UI.ReferenceFacet',
    //     Label : '',
    //     Target: '@UI.FieldGroup#Company'
    // }],
    UI.Facets      : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'AdministrativeData',
        Label : 'Administrative Data',
        Target: '@UI.FieldGroup#AdministrativeData',
    }, ]
);

annotate service.DeliveryCompany with @(
    UI.FieldGroup #Company           : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: name,
        }]
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
