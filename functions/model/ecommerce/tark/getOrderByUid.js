/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { getOrdersByUserUid } = require("../lib");

exports.getOrdersByUid = function(request, response) {
    let status = 200;

    const uid = request.body.data.Uid;
    console.log("Uid", uid);
    getOrdersByUserUid(uid).then((productsData) => {
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