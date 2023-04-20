/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

/**
 * Description
 * @param {any} userEmail
 * @param {any} subjectMessage
 * @param {any} htmlMessage
 * @return {any}
 */
exports.sendMail = function(userEmail, subjectMessage, htmlMessage) {
const sendEmailPromise = db.collection("mail").add({
    to: userEmail,
    message: {
        subject: subjectMessage,
        html: htmlMessage,
    },
});
return Promise.resolve(sendEmailPromise);
};