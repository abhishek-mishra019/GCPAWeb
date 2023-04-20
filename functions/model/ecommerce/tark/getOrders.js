/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { getAllOrders } = require("../lib");

exports.getOrders = function(request, response) {
    let status = 200;

    getAllOrders().then((productsData) => {
        if (productsData) {
            const result = { data: { status: "OK", data: productsData } };
            return response.status(status).send(result);
        }
    }).catch((err) => {
        status = 500;
        console.error(err);
        return response.status(status).send(err);
    });
};