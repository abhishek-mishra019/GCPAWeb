/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { updateApplicant } = require("../lib");


exports.updateRegistrationById = function(request, response) {
    const user = request.body.data;

    const uid = user.uid;
    const prefix = user.prefix;
    const dob = user.dob;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const gaurdFirst = user.gaurdFirst;
    const gaurdLast = user.gaurdLast;
    const address = user.address;
    const zip = user.zip;
    const number = user.number;
    const email = user.email;
    const school = user.school;
    const country = user.country;
    const category = user.category;
    const achievement = user.achievement;
    const Designation = user.Designation;
    const OrgType = user.OrgType;
    const Organization = user.Organization;
    const ShortlistStatus = user.ShortlistStatus;
    const Comments = user.Comments;
    const Rating = user.Rating;
    const social = user.social;


    const status = 200;

    const inputJson = {
        Prefix: prefix,
        Dob: dob,
        FirstName: firstName,
        LastName: lastName,
        GaurdFirst: gaurdFirst,
        GaurdLast: gaurdLast,
        Address: address,
        Zip: zip,
        Number: number,
        Email: email,
        School: school,
        Country: country,
        Category: category,
        Achievement: achievement,
        Social: social,
        GaurdianDesignation: Designation,
        GaurdianOrganizationType: OrgType,
        GaurdianOrganization: Organization,
        ShortlistStatus: ShortlistStatus,
        Comments: Comments,
        Rating: Rating,

    };

    updateApplicant(inputJson, uid).then(() => {
       const result = { data: "Registration Updated" };
        console.log("Registration Updated");
        return response.status(status).send(result);
    }).catch((error) => {
       const result = { data: error };
        console.error("Error Updating Registration", error);
        return response.status(status).send(result);
    });
};