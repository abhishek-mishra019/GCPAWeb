/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { db } = require("../application/lib");

exports.createSupport = function(userUid, name, supportType, message, contactEmail, ticketId, date, time, state, assignedTo) {
    const supportData = db.collection("Support").doc(ticketId).set({
        UserUid: userUid,
        Name: name,
        SupportType: supportType,
        Message: message,
        ContactEmail: contactEmail,
        NumberOfActivity: 0,
        TicketId: ticketId,
        Show: false,
        Date: date,
        Time: time,
        State: state,
        AssignedTo: assignedTo,
    });
    return Promise.resolve(supportData);
};

exports.updateSupport = function(ticketId, state, assignedTo) {
    const supporUpdatetData = db.collection("Support").doc(ticketId).update({
        State: state,
        AssignedTo: assignedTo,
    });
    return Promise.resolve(supporUpdatetData);
};

exports.getUsersSupport = function(UserUid) {
    let query = db.collection("Support");

    query = query.where("UserUid", "==", UserUid);

    const promise = query.get().then((doc) => {
        const data = [];
        doc.forEach((element) => {
            if (element.exists) {
                data.push(element.data());
            }
        });
        return data;
    });

    return Promise.resolve(promise);
};

exports.getSupportData = function(ticketId) {
    let query = db.collection("Support");

    query = query.where("TicketId", "==", ticketId);
    const promise = query.get().then((doc) => {
        let data;
        doc.forEach((element) => {
            if (element.exists) {
                data = element.data();
            }
        });
        return data;
    });

    return Promise.resolve(promise);
};

exports.getAllSupportData = function() {
    const query = db.collection("Support");

    const promise = query.get().then((doc) => {
        const data = [];
        doc.forEach((element) => {
          if (element.exists) {
            data.push(element.data());
          }
        });
        return data;
      });
      return Promise.resolve(promise);
};


exports.updateSupportData = function(ticketId, inputJson) {
    const editSupportPromise = db.collection("Support").doc(ticketId).update(inputJson);
    return Promise.resolve(editSupportPromise);
};

exports.createActivityList = function(actId, sendor, message, date, time, ticketId) {
    const activityData = db.collection("Support").doc(ticketId).collection("Activities").doc(actId).set({
        ActId: actId,
        Sendor: sendor,
        Message: message,
        Date: date,
        Time: time,
        TicketId: ticketId,

    });
    return Promise.resolve(activityData);
};

exports.getSupportsActivity = function(ticketId) {
    const query = db.collection("Support").doc(ticketId).collection("Activities");

    const promise = query.get().then((doc) => {
        const data = [];
        doc.forEach((element) => {
            if (element.exists) {
                data.push(element.data());
            }
        });
        return data;
    });

    return Promise.resolve(promise);
};