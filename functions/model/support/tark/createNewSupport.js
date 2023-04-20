/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { createSupport } = require("../lib");
const { updateData } = require("../../raw-data/tark/updateRawData");
const { getRawData } = require("../../raw-data/lib");
const { generateTemplate } = require("../../mailer/tark/generateTemplate");
const { sendMail } = require("../../mail/mail");

const { createActivityList, getSupportData, updateSupportData } = require("../lib");


const createActivity = function(sendor, message, date, time, ticketId) {
    getSupportData(ticketId).then((doc) => {
        const actId = "A" + (doc.NumberOfActivity + 1);
        createActivityList(actId, sendor, message, date, time, ticketId).then(() => {
            console.log("Activity created Successfully");
            const inputJson = {
                NumberOfActivity: doc.NumberOfActivity + 1,
            };
            updateSupportData(doc.TicketId, inputJson).then(() => {
                console.log("Number Of Activity Updated.");
            });
            // eslint-disable-next-line no-undef
            // return response.status(status).send(result);
        }).catch((error) => {
            console.error("Error Creating Activity", error);
            // eslint-disable-next-line no-undef
            // return response.status(status).send(result);
        });
    });
};

const removeCharRecursive = function(str, X) {
    if (str.length == 0) {
        return "";
    }
    if (str.charAt(0) == X) {
        return removeCharRecursive(
            str.substring(1), X);
    }
    return str.charAt(0) +
        removeCharRecursive(
            str.substring(1), X);
};

exports.createNewSupport = function(request, response) {
    const support = request.body.data;
    const UserUid = support.userUid;
    const Name = support.name;
    const SupportType = support.supportType;
    const Message = support.message;
    const ContactEmail = support.contactEmail;
    const date = support.date;
    const time = support.time;
    const state = support.state;
    const assignedTo = support.assignedTo;

    const status = 200;
    getRawData().then((doc) => {
        const key = Name.slice(3) + time.toString();
        let ticketId = Buffer.from(key).toString("base64");
        ticketId = removeCharRecursive(ticketId, "=");
        createSupport(UserUid, Name, SupportType, Message, ContactEmail, ticketId, date, time, state, assignedTo).then(() => {
           const result = { data: "Support created Successfully" };
            console.log("Support created Successfully");
            updateData("support").then(() => {
                console.log("User Raw Data Updated.");
            });
            createActivity("user", Message, date, time, ticketId);
            const data = {};
            data.Id = ticketId;
            data.Status = "Raised";
            generateTemplate("Support_New", Name, data ).then((message)=>{
                sendMail(ContactEmail, message[0], message[1]);
            });
            return response.status(status).send(result);
        }).catch((error) => {
          const result = { data: error };
            console.error("Error Creating Support", error);
            return response.status(status).send(result);
        });
    });
};