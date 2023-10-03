using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../srv/services/StorageService';
using {com.sap.internal.digitallab.packagehandling.service.StorageService.StorageSlot} from './layout_storageslot';
using {com.sap.internal.digitallab.packagehandling.service.StorageService.Storage} from './layout_storage';

annotate service.Storage with @odata.draft.enabled;
annotate com.sap.internal.digitallab.packagehandling.core.Storage with @fiori.draft.enabled;
annotate service.BuildingFloor with @cds.odata.valuelist;
annotate service.Storage with @cds.odata.valuelist;
// annotate service.StorageSlot with @odata.draft.enabled;
annotate service.Storage with @(Capabilities.DeleteRestrictions: {Deletable: delete_ac, //Search-Term: #DynamicCRUD
}, );
annotate service.StorageSlot with @(Capabilities.DeleteRestrictions: {Deletable: delete_ac, //Search-Term: #DynamicCRUD
}, );

// annotate service.RootEntities with @(

// );
