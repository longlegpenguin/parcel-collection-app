namespace com.sap.internal.digitallab.packagehandling.service;

using com.sap.internal.digitallab.packagehandling.service.StorageService from '.';

annotate StorageService with @(requires: 'authenticated-user');