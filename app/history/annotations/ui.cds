using com.sap.internal.digitallab.packagehandling.service.HistoryService as service from '../../../srv/services/HistoryService';

annotate service.Package with @(
    UI.SelectionFields: [
        status.name,
        type.name,
        deliveryCompany.name,
        pickupTime
    ],
    UI.LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: type.name,
        },
        {
            $Type: 'UI.DataField',
            Value: status.name,
        },
        {
            $Type: 'UI.DataField',
            Value: deliveryCompany.name,
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
    recipient       @UI.HiddenFilter: true;
    slot            @UI.HiddenFilter: true;
    receptionist    @UI.HiddenFilter: true;
    comment         @UI.HiddenFilter: true;
    delete_ac       @UI.HiddenFilter: true;
    confirm_ac      @UI.HiddenFilter: true;
    pickup_ac       @UI.HiddenFilter: true;
    ID              @UI.HiddenFilter: true;
    createdAt       @UI.HiddenFilter: true;
    createdBy       @UI.HiddenFilter: true;
    modifiedAt      @UI.HiddenFilter: true;
    modifiedBy      @UI.HiddenFilter: true;
    deliveryCompany @UI.HiddenFilter: true;
    type            @UI.HiddenFilter: true;
    status          @UI.HiddenFilter: true;
};
