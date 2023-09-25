
DROP VIEW IF EXISTS localized_DummyService_SlotStatus;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_Package;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_StorageSlot;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_Storage;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_SlotStatus;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_PackageType;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_PackageStatus;
DROP VIEW IF EXISTS localized_com_sap_internal_digitallab_packagehandling_core_DeliveryCompany;
DROP VIEW IF EXISTS DummyService_SlotStatus_texts;
DROP VIEW IF EXISTS DummyService_SlotStatus;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_StorageSlot_texts;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_Storage_texts;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_SlotStatus_texts;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_PackageType_texts;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_PackageStatus_texts;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_DeliveryCompany_texts;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_StorageSlot;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_Storage;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_SlotStatus;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_PackageType;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_PackageStatus;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_Package;
DROP TABLE IF EXISTS com_sap_internal_digitallab_packagehandling_core_DeliveryCompany;

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
  totalPackages INTEGER,
  currentPackages INTEGER,
  packages_ID NVARCHAR(36),
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
  totalPackages INTEGER,
  PRIMARY KEY(ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_DeliveryCompany_texts (
  locale NVARCHAR(14) NOT NULL,
  ID NVARCHAR(36) NOT NULL,
  name NVARCHAR(255) NOT NULL,
  PRIMARY KEY(locale, ID)
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

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_Storage_texts (
  locale NVARCHAR(14) NOT NULL,
  ID NVARCHAR(36) NOT NULL,
  name NVARCHAR(255) NOT NULL,
  locationInstructions NVARCHAR(1000),
  map NVARCHAR(255),
  PRIMARY KEY(locale, ID)
); 

CREATE TABLE com_sap_internal_digitallab_packagehandling_core_StorageSlot_texts (
  locale NVARCHAR(14) NOT NULL,
  ID NVARCHAR(36) NOT NULL,
  name NVARCHAR(255) NOT NULL,
  PRIMARY KEY(locale, ID)
); 

CREATE VIEW DummyService_SlotStatus AS SELECT
  SlotStatus_0.name,
  SlotStatus_0.descr,
  SlotStatus_0.code
FROM com_sap_internal_digitallab_packagehandling_core_SlotStatus AS SlotStatus_0; 

CREATE VIEW DummyService_SlotStatus_texts AS SELECT
  texts_0.locale,
  texts_0.name,
  texts_0.descr,
  texts_0.code
FROM com_sap_internal_digitallab_packagehandling_core_SlotStatus_texts AS texts_0; 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_core_DeliveryCompany AS SELECT
  L_0.ID,
  L_0.createdAt,
  L_0.createdBy,
  L_0.modifiedAt,
  L_0.modifiedBy,
  coalesce(localized_1.name, L_0.name) AS name,
  L_0.logo
FROM (com_sap_internal_digitallab_packagehandling_core_DeliveryCompany AS L_0 LEFT JOIN com_sap_internal_digitallab_packagehandling_core_DeliveryCompany_texts AS localized_1 ON localized_1.ID = L_0.ID AND localized_1.locale = @locale); 

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

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_core_Storage AS SELECT
  L_0.ID,
  L_0.createdAt,
  L_0.createdBy,
  L_0.modifiedAt,
  L_0.modifiedBy,
  coalesce(localized_1.name, L_0.name) AS name,
  L_0.buildingFloor,
  coalesce(localized_1.locationInstructions, L_0.locationInstructions) AS locationInstructions,
  coalesce(localized_1.map, L_0.map) AS map,
  L_0.totalPackages,
  L_0.currentPackages,
  L_0.packages_ID
FROM (com_sap_internal_digitallab_packagehandling_core_Storage AS L_0 LEFT JOIN com_sap_internal_digitallab_packagehandling_core_Storage_texts AS localized_1 ON localized_1.ID = L_0.ID AND localized_1.locale = @locale); 

CREATE VIEW localized_com_sap_internal_digitallab_packagehandling_core_StorageSlot AS SELECT
  L_0.ID,
  L_0.createdAt,
  L_0.createdBy,
  L_0.modifiedAt,
  L_0.modifiedBy,
  coalesce(localized_1.name, L_0.name) AS name,
  L_0.storage_ID,
  L_0.status_code,
  L_0.totalPackages
FROM (com_sap_internal_digitallab_packagehandling_core_StorageSlot AS L_0 LEFT JOIN com_sap_internal_digitallab_packagehandling_core_StorageSlot_texts AS localized_1 ON localized_1.ID = L_0.ID AND localized_1.locale = @locale); 

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

CREATE VIEW localized_DummyService_SlotStatus AS SELECT
  SlotStatus_0.name,
  SlotStatus_0.descr,
  SlotStatus_0.code
FROM localized_com_sap_internal_digitallab_packagehandling_core_SlotStatus AS SlotStatus_0; 

