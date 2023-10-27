namespace com.sap.internal.digitallab.packagehandling.service;

using {com.sap.internal.digitallab.packagehandling.core as core} from '../../db/models/packagehandling/';
using {com.sap.internal.digitallab.packagehandling.common as common} from '../../db/models/common/';

/*
 * Service definition
 */
@path: 'StorageService'
service StorageService {

    annotate core.Storage with @(Capabilities.DeleteRestrictions: {Deletable: delete_ac, }, );
    annotate core.StorageSlot with @(Capabilities.DeleteRestrictions: {Deletable: delete_ac, }, );
    entity Storage       as projection on core.Storage;
    entity StorageSlot   as projection on core.StorageSlot;

    @readonly
    entity SlotStatus    as projection on core.SlotStatus;

    @readonly
    entity Building      as projection on common.Building {
        ID,
        name,
        map,
        address,
        coordinates,
        phoneNumber
    };

    @readonly
    entity BuildingFloor as projection on common.BuildingFloor {
        ID,
        name,
        map,
        building
    };

    action massCreate(row : Integer, rowType : String(1), col : Integer, colType : String(1), storage : type of Storage : ID) returns Integer;
}

/*
 * Input validation
 */
annotate core.Storage with {
    name          @mandatory;
    buildingFloor @mandatory;
};

annotate core.StorageSlot with {
    name     @mandatory;
    storage  @mandatory  @assert.target;
    status   @readonly   @cds.on.insert: {status_code: 'empty'};
};
