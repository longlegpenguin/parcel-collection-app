using com.sap.internal.digitallab.packagehandling.service.PackageService as service from '../../../srv/services/PackageService';

annotate service.Package with @(
    UI.SelectionFields: [
        recipient,
        type.name,
        deliveryCompany.name,
        comfirmationTime
    ],
    UI.FilterFacets   : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'BasicData',
            Label : 'Basic',
            Target: '@UI.FieldGroup#Basic',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneralData',
            Label : 'Package',
            Target: '@UI.FieldGroup#GeneralData',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'AdminData',
            Label : 'Administrative Data',
            Target: '@UI.FieldGroup#AdminData',
        }
    ],
    UI.SelectionVariant #variant1 : {
        Text : '{i18n>SVariant1}',
        SelectOptions : [
            {
                PropertyName : status.criticality,
                Ranges : [
                    {
                        Sign : #I,
                        High : 2,
                        Option : #BT,
                        Low : 0,
                    },
                ],
            },
        ],
    },
    UI.SelectionVariant #variant2 : {
        Text            : '{i18n>SVariant2}',
        SelectOptions   : [
            {
                PropertyName    : status.criticality,
                Ranges          : [
                    {
                        Sign    : #I,
                        Option  : #EQ, //Equals
                        Low     : 3,
                    },
                ],
            },
        ],
    },
    UI.LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: recipient,
        },
        {
            $Type: 'UI.DataField',
            Value: type.name,
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

annotate service.Building with {
    name   @UI.HiddenFilter: false;
    floors @UI.HiddenFilter: false;
    ID     @UI.HiddenFilter: false;
};

annotate service.BuildingFloor with {
    name     @UI.HiddenFilter: false;
    building @UI.HiddenFilter: false;
    ID       @UI.HiddenFilter: false;
};

annotate service.Package with {
    slot             @UI.HiddenFilter: true   @UI.Hidden: false;
    receptionist     @UI.HiddenFilter: false  @UI.Hidden: false;
    comment          @UI.HiddenFilter: true   @UI.Hidden: false;
    delete_ac        @UI.HiddenFilter: true   @UI.Hidden: true;
    confirm_ac       @UI.HiddenFilter: true   @UI.Hidden: true;
    pickup_ac        @UI.HiddenFilter: true   @UI.Hidden: true;
    ID               @UI.HiddenFilter: true   @UI.Hidden: true;
    createdAt        @UI.HiddenFilter: false  @UI.Hidden: false;
    createdBy        @UI.HiddenFilter: false  @UI.Hidden: false;
    modifiedAt       @UI.HiddenFilter: false  @UI.Hidden: false;
    modifiedBy       @UI.HiddenFilter: false  @UI.Hidden: false;
    deliveryCompany  @UI.HiddenFilter: true   @UI.Hidden: true;
    type             @UI.HiddenFilter: true   @UI.Hidden: true;
    status           @UI.HiddenFilter: true   @UI.Hidden: true;
};


annotate service.Package with @(
    UI.FieldGroup #AdminData  : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: createdAt,
            },
            {
                $Type: 'UI.DataField',
                Value: createdBy,
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedAt,
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedBy,
            },
        ]
    },
    UI.FieldGroup #GeneralData: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: receptionist,
            },
            {
                $Type: 'UI.DataField',
                Value: slot.storage.buildingFloor.name,
            },
            {
                $Type: 'UI.DataField',
                Value: slot.storage.buildingFloor.building.name,
            },
            {
                $Type: 'UI.DataField',
                Value: slot.name,
            },
            {
                $Type: 'UI.DataField',
                Value: comfirmationTime,
            },
            {
                $Type: 'UI.DataField',
                Value: pickupTime,
            },
            {
                $Type: 'UI.DataField',
                Value: comment,
            }
        ],
    },
    UI.FieldGroup #Basic      : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: recipient,
            },
            {
                $Type: 'UI.DataField',
                Value: type_code,
            },
            {
                $Type: 'UI.DataField',
                Value: deliveryCompany.name,
            },
            {
                $Type: 'UI.DataField',
                Value: slot.storage.name,
            },
            {
                $Type: 'UI.DataField',
                Value: comfirmationTime,
            }
        ],
    },
    UI.Facets                 : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'BasicData',
            Label : 'Basic',
            Target: '@UI.FieldGroup#Basic',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneralData',
            Label : 'General Data',
            Target: '@UI.FieldGroup#GeneralData',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'AdminData',
            Label : 'Administrative Data',
            Target: '@UI.FieldGroup#AdminData',
        },
    ]
);
