export interface User {
    uid: string;
    photoURL: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    providerId: string;
    // numberOfRegistrations:number;
}
 
export interface UserFetched {
    Uid: string;
    PhotoURL: string;
    DisplayName: string;
    Email: string;
    PhoneNumber: string;
    ProviderId: string;
    NumberOfRegistrations:number;
    Admin:boolean;
    Permissions: Permissions;
}

export interface Permissions {
    Users: boolean;
    Registrations: boolean;
    Partners: boolean;
    Testimonials: boolean;
    Media: boolean;
    Gallery: boolean;
    Ecommerce: boolean;
    Orders: boolean;
    Support: boolean;
} 