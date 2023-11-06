using com.sap.internal.digitallab.packagehandling.service.CompanyService as service from '../../../srv/services/CompanyService';

annotate service.DeliveryCompany with {
    name       @title: 'Company';
    logo       @title: 'Logo';
    packages   @title: 'Packages';
    createdAt  @title: 'Created On';
    createdBy  @title: 'Created By';
    modifiedAt @title: 'Last Update On';
    modifiedBy @title: 'Last Update By';
    ID         @title: 'UUID';
};
