/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { fastify, functions, cors, requestHandler } = require("../application/lib");
// eslint-disable linebreak-style
const { addPayment } = require("./tark/addPayment");
const { paymentVerification } = require("./tark/paymentVerification");
const { addEcommercePayment } = require("./tark/addEcommercePayment");
// const { getBase64TokenVerification2 } = require("./tark/getBase64TokenVerification2");
const { paymentVerification2 } = require("./tark/paymentVerification2");

fastify.post("/paymentVerification", (req, res) => {
    paymentVerification(req, res);
});

fastify.post("/paymentVerification2", (req, res) => {
    paymentVerification2(req, res);
});

fastify.post("/addPayment", (req, res) => {
    addPayment(req, res);
});

fastify.post("/addEcommercePayment", (req, res) => {
    addEcommercePayment(req, res);
});

exports.payment = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
            requestHandler(req, res);
        });
    });
});