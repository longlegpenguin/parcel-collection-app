using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../srv/services/StorageService';
using {com.sap.internal.digitallab.packagehandling.service.StorageService.StorageSlot} from './layout_storageslot';


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
