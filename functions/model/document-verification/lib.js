/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// const { db } = require("../application/lib");

// exports.getCertificateUsingRefId = function(referenceId) {
//     const query = db.collection("Certificates").doc(referenceId);
//     const promise = query.get().then((doc) => {
//         let data;
//         doc.forEach((element) => {
//             if (element.exists) {
//                 data = element.data();
//             }
//         });
//         return data;
//     });
//     return Promise.resolve(promise);
// };
// code not functional, under development