/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { sendMail } = require("../mail/mail");
const { getUser } = require("../user/lib");
const { generateTemplate } = require("./tark/generateTemplate");

 /**
  * Description
  * @param {any} uid
  * @param {any} mailType
  * @param {any} applicationId
  * @return {any}
  */
  exports.mailer = function(uid, mailType, applicationId) {
    const promise = getUser(uid, "").then((data) => {
        const p1 = generateTemplate(mailType, data.DisplayName, applicationId).then((message)=>{
            sendMail(data.Email, message[0], message[1]);
        }).catch((error)=>{
            console.error(error);
        return error;
        });
        Promise.resolve(p1);
    }).catch((error) => {
        console.error(error);
        return error;
    });
    return Promise.resolve(promise);
};

 /**
  * Description
  * @param {any} uid
  * @param {any} applicantName
  * @param {any} mailType
  * @param {any} applicationId
  * @return {any}
  */
 exports.mailerAN = function(uid, applicantName, mailType, applicationId) {
    const promise = getUser(uid, "").then((data) => {
        const p1 = generateTemplate(mailType, applicantName, applicationId).then((message)=>{
            sendMail(data.Email, message[0], message[1]);
        }).catch((error)=>{
            console.error(error);
        return error;
        });
        Promise.resolve(p1);
    }).catch((error) => {
        console.error(error);
        return error;
    });
    return Promise.resolve(promise);
};