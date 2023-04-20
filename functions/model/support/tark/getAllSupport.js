/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { getAllSupportData } = require("../lib");

exports.getAllSupport = function(request, response) {
    let status = 200;

    getAllSupportData().then((supportData) => {
        if (supportData) {
            const result = { data: { status: "OK", data: supportData } };
            return response.status(status).send(result);
        }
    }).catch((err) => {
        status = 500;
        console.error(err);
        return response.status(status).send(err);
    });
};