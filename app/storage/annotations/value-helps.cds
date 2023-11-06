using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../../srv/services/StorageService';

annotate service.BuildingFloor with @cds.odata.valuelist;

annotate service with @Consumption.valueHelpDefinition: [{entity: {
    name   : 'BuildingFloor',
    element: 'name'
}}];

annotate service.Storage with {
    buildingFloor @ValueListMapping: {
        Label         : 'Building floor help',
        CollectionPath: 'BuildingFloor',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                ValueListProperty: 'name',
                LocalDataProperty: buildingFloor.name
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'ID'
            }
        ]
    }
};