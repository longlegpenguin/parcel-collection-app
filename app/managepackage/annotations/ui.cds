using com.sap.internal.digitallab.packagehandling.service.PackageService as service from '../../../srv/services/PackageService';

annotate service.Package with @(
    UI.SelectionFields           : [
        recipient.sapId,
        typeName,
        dc,
        storageName,
    ],
    UI.FilterFacets              : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'BasicData',
            Label : 'Basic',
            Target: '@UI.FieldGroup#Basic',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'PackageData',
            Label : 'Package Data',
            Target: '@UI.FieldGroup#PackageData',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'AdminData',
            Label : 'Administrative Data',
            Target: '@UI.FieldGroup#AdminData',
        }
    ],
    UI.SelectionVariant #variant1: {
        Text         : 'Confirmed',
        SelectOptions: [{
            PropertyName: status.criticality,
            Ranges      : [{
                Sign  : #I,
                Option: #EQ,
                Low   : 2,
            }, ],
        }, ],
    },
    UI.SelectionVariant #variant2: {
        Text         : 'Picked Up',
        SelectOptions: [{
            PropertyName: status.criticality,
            Ranges      : [{
                Sign  : #I,
                Option: #EQ,
                Low   : 3,
            }, ],
        }, ],
    },
    UI.SelectionVariant #variant3: {
        Text         : 'New',
        SelectOptions: [{
            PropertyName: status.criticality,
            Ranges      : [{
                Sign  : #I,
                Option: #EQ,
                Low   : 1,
            }, ],
        }, ],
    },
    UI.LineItem                  : [
        {
            $Type : 'UI.DataFieldForAnnotation',
            Target: 'recipient/@Communication.Contact',
            Label : 'Recipient',
        },
        {
            $Type: 'UI.DataField',
            Value: loc,
        },
        {
            $Type  : 'UI.DataField',
            Value  : type.name,
            IconUrl: type.icon,
            ![@UI.Importance] : #High
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
    receptionist     @UI.HiddenFilter: true   @UI.Hidden: false;
    recipient        @UI.HiddenFilter: true   @UI.Hidden: false;
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
    recepId          @UI.HiddenFilter: false  @UI.Hidden: false;
    bf               @UI.HiddenFilter: false  @UI.Hidden: false;
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
                $Type : 'UI.DataFieldForAnnotation',
                Target: 'receptionist/user/@Communication.Contact',
                Label : 'Receptionist'
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
    UI.FieldGroup #PackageData: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: bf,
            },
            {
                $Type: 'UI.DataField',
                Value: recepId,
            }
        ],
    },
    UI.FieldGroup #Basic      : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataFieldForAnnotation',
                Target: 'recipient/@Communication.Contact',
                Label : 'Recipient'
            },
            {
                $Type : 'UI.DataFieldForAnnotation',
                Target: '@UI.ConnectedFields#Loc',
                Label : 'Location'
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
            },
            {
                $Type: 'UI.DataField',
                Value: pickupTime,
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

annotate service.User with @(
    UI.FieldGroup #udata: {
        Label: 'User Info',
        Data : [
            {Value: firstName},
            {Value: lastName},
            {Value: sapId},
            {Value: mailAddress},
            {Value: phoneNumber},
        ],
    },
    UI.QuickViewFacets  : [{
        $Type : 'UI.ReferenceFacet',
        Target: '@UI.FieldGroup#udata',
    }],
);

annotate service.User with @(UI.HeaderInfo: {
    TypeName      : 'User',
    TypeNamePlural: 'Users',
    Title         : {
        $Type: 'UI.DataField',
        Value: 'User Info',
    },
    Description   : {
        $Type: 'UI.DataField',
        Value: fullName,
    },
    ImageUrl      : '',
    TypeImageUrl  : 'sap-icon://blank-tag',
}, );

annotate service.User with @(Communication.Contact: {
    fn   : diaplayName,
    kind : #org,
    email: [{
        type   : #work,
        address: mailAddress
    }],
    tel  : [{
        type: #preferred,
        uri : phoneNumber
    }],
    photo: 'sap-icon://employee'
});
// annotate service1.Contacts with @(
//     Communication.Contact : {
//         fn   : name, //full name
//         kind : #org,
//         tel  : [{
//             uri  : phone,
//             type : #preferred
//         }],
//         adr  : [{
//             building : building,
//             country  : country.name,
//             street   : street,
//             locality : city,
//             code     : postCode,
//             type     : #preferred
//         }],
//     }
// );

annotate service.Package with @(UI.ConnectedFields #Loc: {
    Label   : 'Location',
    Template: '{st} | {sl}',
    Data    : {
        st: {
            $Type: 'UI.DataField',
            Value: slot.storage.name,
        },
        sl: {
            $Type: 'UI.DataField',
            Value: slot.name,
        },
    },
}, );
