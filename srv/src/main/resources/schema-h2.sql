
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_service_StorageService_Storage;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_service_StorageService_StorageSlot;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_service_StorageService_SlotStatus;
DROP VIEW IF EXISTS com_sap_internal_digitallab_packagehandling_service_StorageService_DraftAdministrativeData;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_common_Receptionist;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_common_Reception;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_Storage;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_DeliveryCompany;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_common_Building;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_StorageSlot;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_Package;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_common_BuildingFloor;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_SlotStatus;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_PackageType;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_PackageStatus;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_common_FloorType;
DROP VIEW IF EXISTS com_sap_internal_digitallab_packagehandling_service_StorageService_SlotStatus_texts;
DROP VIEW IF EXISTS com_sap_internal_digitallab_packagehandling_service_StorageService_BuildingFloor;
DROP VIEW IF EXISTS com_sap_internal_digitallab_packagehandling_service_StorageService_Building;
DROP VIEW IF EXISTS com_sap_internal_digitallab_packagehandling_service_StorageService_SlotStatus;
DROP VIEW IF EXISTS com_sap_internal_digitallab_packagehandling_service_StorageService_StorageSlot;
DROP VIEW IF EXISTS com_sap_internal_digitallab_packagehandling_service_StorageService_Storage;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_service_StorageService_StorageSlot_drafts;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_service_StorageService_Storage_drafts;
DROP TABLE IF EXISTS DRAFT_DraftAdministrativeData;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_SlotStatus_texts;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_PackageType_texts;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_PackageStatus_texts;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_common_FloorType_texts;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_LocalUserData;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_StorageSlot;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_Storage;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_SlotStatus;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_PackageType;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_PackageStatus;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_Package;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_DeliveryCompany;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_common_User;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_common_Receptionist;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_common_Reception;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_common_FloorType;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_common_BuildingFloor;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_common_Building;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_common_ApplicationConfig;

CREATE TABLE com_sap_internal_digitallab_packagehandling_common_ApplicationConfig (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7),
  createdBy NVARCHAR(255),
  modifiedAt TIMESTAMP(7),
  modifiedBy NVARCHAR(255),
  application NVARCHAR(255) NOT NULL,
  confkey NVARCHAR(255) NOT NULL,
  confvalue NVARCHAR(255) NOT NULL,
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_common_Building (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7),
  createdBy NVARCHAR(255),
  modifiedAt TIMESTAMP(7),
  modifiedBy NVARCHAR(255),
  name NVARCHAR(255) NOT NULL,
  address NVARCHAR(255),
  coordinates NVARCHAR(255),
  phoneNumber NVARCHAR(255),
  map NVARCHAR(255),
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_common_BuildingFloor (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7),
  createdBy NVARCHAR(255),
  modifiedAt TIMESTAMP(7),
  modifiedBy NVARCHAR(255),
  name NVARCHAR(255) NOT NULL,
  building_ID NVARCHAR(36) NOT NULL,
  type_code NVARCHAR(255) NOT NULL,
  map NVARCHAR(255),
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_common_FloorType (
  name NVARCHAR(255),
  descr NVARCHAR(1000),
  code NVARCHAR(255) NOT NULL,
  PRIMARY KEY(code)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_common_Reception (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7),
  createdBy NVARCHAR(255),
  modifiedAt TIMESTAMP(7),
  modifiedBy NVARCHAR(255),
  building_ID NVARCHAR(36) NOT NULL,
  name NVARCHAR(255) NOT NULL,
  locationDesc NVARCHAR(1000),
  phoneNumber NVARCHAR(255),
  openMon NVARCHAR(5),
  openTue NVARCHAR(5),
  openWed NVARCHAR(5),
  openThu NVARCHAR(5),
  openFri NVARCHAR(5),
  openSat NVARCHAR(5),
  openSun NVARCHAR(5),
  openHol NVARCHAR(5),
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_common_Receptionist (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7),
  createdBy NVARCHAR(255),
  modifiedAt TIMESTAMP(7),
  modifiedBy NVARCHAR(255),
  user_ID NVARCHAR(36) NOT NULL,
  reception_ID NVARCHAR(36) NOT NULL,
  guard BOOLEAN,
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_common_User (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7),
  createdBy NVARCHAR(255),
  modifiedAt TIMESTAMP(7),
  modifiedBy NVARCHAR(255),
  sapId NVARCHAR(12) NOT NULL,
  firstName NVARCHAR(255) NOT NULL,
  lastName NVARCHAR(255) NOT NULL,
  mailAddress NVARCHAR(255) NOT NULL,
  phoneNumber NVARCHAR(255),
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_DeliveryCompany (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7),
  createdBy NVARCHAR(255),
  modifiedAt TIMESTAMP(7),
  modifiedBy NVARCHAR(255),
  name NVARCHAR(255) NOT NULL,
  logo NVARCHAR(255),
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_Package (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7),
  createdBy NVARCHAR(255),
  modifiedAt TIMESTAMP(7),
  modifiedBy NVARCHAR(255),
  recipient NVARCHAR(255) NOT NULL,
  comfirmationTime TIMESTAMP(7),
  pickupTime TIMESTAMP(7),
  slot_ID NVARCHAR(36),
  deliveryCompany_ID NVARCHAR(36),
  type_code NVARCHAR(255) NOT NULL,
  status_code NVARCHAR(255) NOT NULL,
  receptionist NVARCHAR(255) NOT NULL,
  comment NVARCHAR(255),
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_PackageStatus (
  name NVARCHAR(255),
  descr NVARCHAR(1000),
  code NVARCHAR(255) NOT NULL,
  PRIMARY KEY(code)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_PackageType (
  name NVARCHAR(255),
  descr NVARCHAR(1000),
  code NVARCHAR(255) NOT NULL,
  PRIMARY KEY(code)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_SlotStatus (
  name NVARCHAR(255),
  descr NVARCHAR(1000),
  code NVARCHAR(255) NOT NULL,
  PRIMARY KEY(code)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_Storage (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7),
  createdBy NVARCHAR(255),
  modifiedAt TIMESTAMP(7),
  modifiedBy NVARCHAR(255),
  name NVARCHAR(255) NOT NULL,
  buildingFloor NVARCHAR(36) NOT NULL,
  locationInstructions NVARCHAR(1000),
  map NVARCHAR(255),
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_StorageSlot (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7),
  createdBy NVARCHAR(255),
  modifiedAt TIMESTAMP(7),
  modifiedBy NVARCHAR(255),
  name NVARCHAR(255) NOT NULL,
  storage_ID NVARCHAR(36) NOT NULL,
  status_code NVARCHAR(255) NOT NULL,
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_LocalUserData (
  ID NVARCHAR(36) NOT NULL,
  sapId NVARCHAR(255),
  remoteId NVARCHAR(36),
  termsAccepted BOOLEAN,
  termsAcceptedAt TIMESTAMP(7),
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_common_FloorType_texts (
  locale NVARCHAR(14) NOT NULL,
  name NVARCHAR(255),
  descr NVARCHAR(1000),
  code NVARCHAR(255) NOT NULL,
  PRIMARY KEY(locale, code)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_PackageStatus_texts (
  locale NVARCHAR(14) NOT NULL,
  name NVARCHAR(255),
  descr NVARCHAR(1000),
  code NVARCHAR(255) NOT NULL,
  PRIMARY KEY(locale, code)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_PackageType_texts (
  locale NVARCHAR(14) NOT NULL,
  name NVARCHAR(255),
  descr NVARCHAR(1000),
  code NVARCHAR(255) NOT NULL,
  PRIMARY KEY(locale, code)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_SlotStatus_texts (
  locale NVARCHAR(14) NOT NULL,
  name NVARCHAR(255),
  descr NVARCHAR(1000),
  code NVARCHAR(255) NOT NULL,
  PRIMARY KEY(locale, code)
); 

CREATE TABLE DRAFT_DraftAdministrativeData (
  DraftUUID NVARCHAR(36) NOT NULL,
  CreationDateTime TIMESTAMP(7),
  CreatedByUser NVARCHAR(256),
  DraftIsCreatedByMe BOOLEAN,
  LastChangeDateTime TIMESTAMP(7),
  LastChangedByUser NVARCHAR(256),
  InProcessByUser NVARCHAR(256),
  DraftIsProcessedByMe BOOLEAN,
  PRIMARY KEY(DraftUUID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_service_StorageService_Storage_drafts (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7) NULL,
  createdBy NVARCHAR(255) NULL,
  modifiedAt TIMESTAMP(7) NULL,
  modifiedBy NVARCHAR(255) NULL,
  name NVARCHAR(255) NULL,
  buildingFloor NVARCHAR(36) NULL,
  locationInstructions NVARCHAR(1000) NULL,
  map NVARCHAR(255) NULL,
  IsActiveEntity BOOLEAN,
  HasActiveEntity BOOLEAN,
  HasDraftEntity BOOLEAN,
  DraftAdministrativeData_DraftUUID NVARCHAR(36) NOT NULL,
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_service_StorageService_StorageSlot_drafts (
  ID NVARCHAR(36) NOT NULL,
  createdAt TIMESTAMP(7) NULL,
  createdBy NVARCHAR(255) NULL,
  modifiedAt TIMESTAMP(7) NULL,
  modifiedBy NVARCHAR(255) NULL,
  name NVARCHAR(255) NULL,
  storage_ID NVARCHAR(36) NULL,
  status_code NVARCHAR(255) NULL,
  IsActiveEntity BOOLEAN,
  HasActiveEntity BOOLEAN,
  HasDraftEntity BOOLEAN,
  DraftAdministrativeData_DraftUUID NVARCHAR(36) NOT NULL,
  PRIMARY KEY(ID)
); 

CREATE VIEW com_sap_internal_digitallab_packagehandling_service_StorageService_Storage AS SELECT
  Storage_0.ID,
  Storage_0.createdAt,
  Storage_0.createdBy,
  Storage_0.modifiedAt,
  Storage_0.modifiedBy,
  Storage_0.name,
  Storage_0.buildingFloor,
  Storage_0.locationInstructions,
  Storage_0.map
FROM com_sap_internal_digitallab_packagehandling_core_Storage AS Storage_0; 

CREATE VIEW com_sap_internal_digitallab_packagehandling_service_StorageService_StorageSlot AS SELECT
  StorageSlot_0.ID,
  StorageSlot_0.createdAt,
  StorageSlot_0.createdBy,
  StorageSlot_0.modifiedAt,
  StorageSlot_0.modifiedBy,
  StorageSlot_0.name,
  StorageSlot_0.storage_ID,
  StorageSlot_0.status_code
FROM com_sap_internal_digitallab_packagehandling_core_StorageSlot AS StorageSlot_0; 

CREATE VIEW com_sap_internal_digitallab_packagehandling_service_StorageService_SlotStatus AS SELECT
  SlotStatus_0.name,
  SlotStatus_0.descr,
  SlotStatus_0.code
FROM com_sap_internal_digitallab_packagehandling_core_SlotStatus AS SlotStatus_0; 

CREATE VIEW com_sap_internal_digitallab_packagehandling_service_StorageService_Building AS SELECT
  Building_0.ID,
  Building_0.name,
  Building_0.map,
  Building_0.address,
  Building_0.coordinates,
  Building_0.phoneNumber
FROM com_sap_internal_digitallab_packagehandling_common_Building AS Building_0; 

CREATE VIEW com_sap_internal_digitallab_packagehandling_service_StorageService_BuildingFloor AS SELECT
  BuildingFloor_0.ID,
  BuildingFloor_0.name,
  BuildingFloor_0.map,
  BuildingFloor_0.building_ID
FROM com_sap_internal_digitallab_packagehandling_common_BuildingFloor AS BuildingFloor_0; 

CREATE VIEW com_sap_internal_digitallab_packagehandling_service_StorageService_SlotStatus_texts AS SELECT
  texts_0.locale,
  texts_0.name,
  texts_0.descr,
  texts_0.code
FROM com_sap_internal_digitallab_packagehandling_core_SlotStatus_texts AS texts_0; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_common_FloorType AS SELECT
  coalesce(localized_1.name, L_0.name) AS name,
  coalesce(localized_1.descr, L_0.descr) AS descr,
  L_0.code
FROM (com_sap_internal_digitallab_packagehandling_common_FloorType AS L_0 LEFT JOIN com_sap_internal_digitallab_packagehandling_common_FloorType_texts AS localized_1 ON localized_1.code = L_0.code AND localized_1.locale = @locale); 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_core_PackageStatus AS SELECT
  coalesce(localized_1.name, L_0.name) AS name,
  coalesce(localized_1.descr, L_0.descr) AS descr,
  L_0.code
FROM (com_sap_internal_digitallab_packagehandling_core_PackageStatus AS L_0 LEFT JOIN com_sap_internal_digitallab_packagehandling_core_PackageStatus_texts AS localized_1 ON localized_1.code = L_0.code AND localized_1.locale = @locale); 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_core_PackageType AS SELECT
  coalesce(localized_1.name, L_0.name) AS name,
  coalesce(localized_1.descr, L_0.descr) AS descr,
  L_0.code
FROM (com_sap_internal_digitallab_packagehandling_core_PackageType AS L_0 LEFT JOIN com_sap_internal_digitallab_packagehandling_core_PackageType_texts AS localized_1 ON localized_1.code = L_0.code AND localized_1.locale = @locale); 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_core_SlotStatus AS SELECT
  coalesce(localized_1.name, L_0.name) AS name,
  coalesce(localized_1.descr, L_0.descr) AS descr,
  L_0.code
FROM (com_sap_internal_digitallab_packagehandling_core_SlotStatus AS L_0 LEFT JOIN com_sap_internal_digitallab_packagehandling_core_SlotStatus_texts AS localized_1 ON localized_1.code = L_0.code AND localized_1.locale = @locale); 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_common_BuildingFloor AS SELECT
  L.ID,
  L.createdAt,
  L.createdBy,
  L.modifiedAt,
  L.modifiedBy,
  L.name,
  L.building_ID,
  L.type_code,
  L.map
FROM com_sap_internal_digitallab_packagehandling_common_BuildingFloor AS L; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_core_Package AS SELECT
  L.ID,
  L.createdAt,
  L.createdBy,
  L.modifiedAt,
  L.modifiedBy,
  L.recipient,
  L.comfirmationTime,
  L.pickupTime,
  L.slot_ID,
  L.deliveryCompany_ID,
  L.type_code,
  L.status_code,
  L.receptionist,
  L.comment
FROM com_sap_internal_digitallab_packagehandling_core_Package AS L; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_core_StorageSlot AS SELECT
  L.ID,
  L.createdAt,
  L.createdBy,
  L.modifiedAt,
  L.modifiedBy,
  L.name,
  L.storage_ID,
  L.status_code
FROM com_sap_internal_digitallab_packagehandling_core_StorageSlot AS L; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_common_Building AS SELECT
  L.ID,
  L.createdAt,
  L.createdBy,
  L.modifiedAt,
  L.modifiedBy,
  L.name,
  L.address,
  L.coordinates,
  L.phoneNumber,
  L.map
FROM com_sap_internal_digitallab_packagehandling_common_Building AS L; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_core_DeliveryCompany AS SELECT
  L.ID,
  L.createdAt,
  L.createdBy,
  L.modifiedAt,
  L.modifiedBy,
  L.name,
  L.logo
FROM com_sap_internal_digitallab_packagehandling_core_DeliveryCompany AS L; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_core_Storage AS SELECT
  L.ID,
  L.createdAt,
  L.createdBy,
  L.modifiedAt,
  L.modifiedBy,
  L.name,
  L.buildingFloor,
  L.locationInstructions,
  L.map
FROM com_sap_internal_digitallab_packagehandling_core_Storage AS L; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_common_Reception AS SELECT
  L.ID,
  L.createdAt,
  L.createdBy,
  L.modifiedAt,
  L.modifiedBy,
  L.building_ID,
  L.name,
  L.locationDesc,
  L.phoneNumber,
  L.openMon,
  L.openTue,
  L.openWed,
  L.openThu,
  L.openFri,
  L.openSat,
  L.openSun,
  L.openHol
FROM com_sap_internal_digitallab_packagehandling_common_Reception AS L; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_common_Receptionist AS SELECT
  L.ID,
  L.createdAt,
  L.createdBy,
  L.modifiedAt,
  L.modifiedBy,
  L.user_ID,
  L.reception_ID,
  L.guard
FROM com_sap_internal_digitallab_packagehandling_common_Receptionist AS L; 

CREATE VIEW com_sap_internal_digitallab_packagehandling_service_StorageService_DraftAdministrativeData AS SELECT
  DraftAdministrativeData.DraftUUID,
  DraftAdministrativeData.CreationDateTime,
  DraftAdministrativeData.CreatedByUser,
  DraftAdministrativeData.DraftIsCreatedByMe,
  DraftAdministrativeData.LastChangeDateTime,
  DraftAdministrativeData.LastChangedByUser,
  DraftAdministrativeData.InProcessByUser,
  DraftAdministrativeData.DraftIsProcessedByMe
FROM DRAFT_DraftAdministrativeData AS DraftAdministrativeData; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_service_StorageService_SlotStatus AS SELECT
  SlotStatus_0.name,
  SlotStatus_0.descr,
  SlotStatus_0.code
FROM localized_com_sap_internal_digitallab_packagehandling_core_SlotStatus AS SlotStatus_0; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_service_StorageService_StorageSlot AS SELECT
  StorageSlot_0.ID,
  StorageSlot_0.createdAt,
  StorageSlot_0.createdBy,
  StorageSlot_0.modifiedAt,
  StorageSlot_0.modifiedBy,
  StorageSlot_0.name,
  StorageSlot_0.storage_ID,
  StorageSlot_0.status_code
FROM localized_com_sap_internal_digitallab_packagehandling_core_StorageSlot AS StorageSlot_0; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_service_StorageService_Storage AS SELECT
  Storage_0.ID,
  Storage_0.createdAt,
  Storage_0.createdBy,
  Storage_0.modifiedAt,
  Storage_0.modifiedBy,
  Storage_0.name,
  Storage_0.buildingFloor,
  Storage_0.locationInstructions,
  Storage_0.map
FROM localized_com_sap_internal_digitallab_packagehandling_core_Storage AS Storage_0; 

