import { StartSericeService } from "../services/start-serice.service";

export interface Register {
    Uid:string ;
    Prefix:string;
    Dob:string;
    FirstName:string;
    LastName:string;
    GaurdFirst:string;
    GaurdLast:string;
    Address:string;
    Zip:string;
    Number:string;
    Email:string;
    School:string;
    Country:string;
    Category:string;
    Achievement:string;
    Photo:string;
    Profile:string;
    Social:string;
    UserUid:string;
    PaymentStatus:string;
    EmailUpdates:boolean;
    State:string;
    Gender: string;
    Relationship: string;
    GaurdianDesignation:string;
    GaurdianOrganizationType:string;
    GaurdianOrganization: string;
}