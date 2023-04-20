/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { deletePartners } = require("../lib");

exports.deletePartner = function(request, response) {
    const uid = request.body.data.Uid;
    let result;
    deletePartners(uid).then(() => {
        result = { data: "Partners Deleted successfully" };
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};