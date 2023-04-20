/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { updateSupport } = require("../lib");

exports.updateSupport = function(request, response) {
    const ticketId = request.body.data.ticketId;
    console.log("TICKETID: "+ ticketId);
    const state = request.body.data.state;
    console.log("TICKETID: "+ state);
    const assignedTo = request.body.data.assignedTo;
    console.log("TICKETID: "+ assignedTo);

    let result;
    updateSupport(ticketId, state, assignedTo).then(() => {
        result = { data: "Support Ticket Updated successfully" };
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};