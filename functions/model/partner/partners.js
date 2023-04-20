/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { fastify, functions, cors, requestHandler } = require("../application/lib");
const { addPartner } = require("./tark/addPartner");
const { getPartners } = require("./tark/getPartners");
const { editPartner } = require("./tark/editPartner");
const { deletePartner } = require("./tark/deletePartner");


fastify.post("/addPartner", (req, res) => {
    console.log("Adding Partner");
    addPartner(req, res);
});

fastify.post("/getPartners", (req, res) => {
    console.log("getting Partner");
    getPartners(req, res);
});

fastify.post("/editPartner", (req, res) => {
    console.log("Updating Partner");
    editPartner(req, res);
});

fastify.post("/deletePartner", (req, res) => {
    console.log("Deleting Partner");
    deletePartner(req, res);
});

exports.partners = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
            requestHandler(req, res);
        });
    });
});

