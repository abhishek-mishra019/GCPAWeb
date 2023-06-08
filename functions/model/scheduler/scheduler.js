/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { functions } = require("../application/lib");

exports.onCreateRegistration = functions.firestore
    .document("Registrations/{registrationID}")
    .onWrite((snap, context) => {
        const data = snap.data();
        console.log(data);
    });