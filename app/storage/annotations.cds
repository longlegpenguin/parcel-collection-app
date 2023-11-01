using com.sap.internal.digitallab.packagehandling.service.StorageService as service from '../../srv/services/StorageService';
using from './labels';
using from './storage_obj_page';

annotate service.BuildingFloor with @cds.odata.valuelist;
