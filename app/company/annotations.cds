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
    logo //@odata.mediaContentType: 'image/jpg'
    @Common.Text: name  @Core.MediaType: 'image/jpg';
};

annotate service.DeliveryCompany with @(
    UI.FieldGroup #GeneratedGroup1: {
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
    UI.Facets                     : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup1',
    }, ]
);
