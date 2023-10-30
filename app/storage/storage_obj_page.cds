using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../srv/services/StorageService';

/*
 * Storage list page
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
        Value: buildingFloor,
    },
    {
        $Type: 'UI.DataFieldWithUrl',
        Label: 'Map',
        Value: 'Open',
        Url: map
    }
]});
// annotate service.Storage with {
//     map @Core.IsURL;
// };

annotate service.Storage with @(UI.FieldGroup #ObjHeaderCalculated: {Data: [
    {
        $Type: 'UI.DataField',
        Label: 'Total Utilization',
        Value: totalPackages,
    }
]});
annotate service.Storage with @(UI.FieldGroup #ObjHeaderCalculated2: {Data: [
    {
        $Type: 'UI.DataField',
        Label: 'Current Utilization',
        Value: currentPackages,
    },
]});
