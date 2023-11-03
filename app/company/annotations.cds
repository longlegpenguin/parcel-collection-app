using com.sap.internal.digitallab.packagehandling.service.CompanyService as service from '../../srv/services/CompanyService';

annotate service.DeliveryCompany with @(UI.LineItem: [
    {
        $Type             : 'UI.DataField',
        Value             : logo,
        ![@UI.Importance] : #High
    },
    {
        $Type: 'UI.DataField',
        Label: 'Company',
        Value: name,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Created On',
        Value: createdAt,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Created By',
        Value: createdBy,
    }
]);

annotate service.DeliveryCompany with {
    logo @odata.mediaContentType: 'image/jpeg' 
    @Common.Text: name  @Core.MediaType: 'image/jpeg';
};

annotate service.DeliveryCompany with @(
    UI.FieldGroup #Company: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type             : 'UI.DataField',
                Value             : logo,
                ![@UI.Importance] : #High
            },
            {
                $Type: 'UI.DataField',
                Label: 'Company',
                Value: name,
            }
        ]
    },
    UI.Facets                     : [
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
    ]
);


annotate service.DeliveryCompany with @(UI.FieldGroup #AdministrativeData: {
    $Type: 'UI.FieldGroupType',
    Data : [
        {
            $Type: 'UI.DataField',
            Label: 'Created On',
            Value: createdAt,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Created By',
            Value: createdBy,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Last Update On',
            Value: modifiedAt,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Last Update By',
            Value: modifiedBy,
        },
    ]
});
