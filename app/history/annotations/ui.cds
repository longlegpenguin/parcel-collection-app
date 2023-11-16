using com.sap.internal.digitallab.packagehandling.service.HistoryService as service from '../../../srv/services/HistoryService';

annotate service.Package with @(
    UI.SelectionFields: [
        statusName,
        typeName,
        dc,
        pickupTime
    ],
    UI.LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: typeName,
            ![@UI.Hidden] ,
        },
        {
            $Type             : 'UI.DataField',
            Criticality       : status.criticality,
            Value             : status.name,
            ![@UI.Importance] : #High
        },
        {
            $Type: 'UI.DataField',
            Value: comfirmationTime,
        },
        {
            $Type: 'UI.DataField',
            Value: pickupTime,
        },
    ]
);


annotate service.Package with {
    recipient        @UI.HiddenFilter: true  @UI.Hidden: true;
    slot             @UI.HiddenFilter: true  @UI.Hidden: true;
    receptionist     @UI.HiddenFilter: true  @UI.Hidden: true;
    comment          @UI.HiddenFilter: true  @UI.Hidden: true;
    delete_ac        @UI.HiddenFilter: true  @UI.Hidden: true;
    confirm_ac       @UI.HiddenFilter: true  @UI.Hidden: true;
    pickup_ac        @UI.HiddenFilter: true  @UI.Hidden: true;
    ID               @UI.HiddenFilter: true  @UI.Hidden: true;
    createdAt        @UI.HiddenFilter: true  @UI.Hidden: true;
    createdBy        @UI.HiddenFilter: true  @UI.Hidden: true;
    modifiedAt       @UI.HiddenFilter: true  @UI.Hidden: true;
    modifiedBy       @UI.HiddenFilter: true  @UI.Hidden: true;
    deliveryCompany  @UI.HiddenFilter: true  @UI.Hidden: true;
    type             @UI.HiddenFilter: true  @UI.Hidden: true;
    status           @UI.HiddenFilter: true  @UI.Hidden: true;
    bf               @UI.HiddenFilter: true  @UI.Hidden: true;
    loc              @UI.HiddenFilter: true  @UI.Hidden: true;
    recepId          @UI.HiddenFilter: true  @UI.Hidden: true;
    storageName      @UI.HiddenFilter: true  @UI.Hidden: true;
};
