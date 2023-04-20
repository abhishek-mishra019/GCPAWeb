/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { createNewSupport } = require("./tark/createNewSupport");
const { getSupportList } = require("./tark/getSupportList");
const { fastify, functions, cors, requestHandler } = require("../application/lib");
const { createActivity } = require("./tark/createActivity");
const { getActivityList } = require("./tark/getActivity");
const { getSupportById } = require("./tark/getSupportById");
const { contactMail } = require("./tark/contactUs");
const { getAllSupport } = require("./tark/getAllSupport");
const { sendSupportMail } = require("./tark/sendSupportMail");
const { updateSupport } = require("./tark/updateSupport");


fastify.post("/createNewSupport", (req, res) => {
    createNewSupport(req, res);
});

fastify.post("/updateSupport", (req, res) => {
    updateSupport(req, res);
});

fastify.post("/getSupportList", (req, res) => {
    getSupportList(req, res);
});

fastify.post("/createActivity", (req, res) => {
    createActivity(req, res);
});

fastify.post("/sendSupportMail", (req, res) => {
    sendSupportMail(req, res);
});

fastify.post("/getActivity", (req, res) => {
    getActivityList(req, res);
});

fastify.post("/getSupportById", (req, res) => {
    getSupportById(req, res);
});

fastify.post("/getAllSupport", (req, res) => {
    console.log("getting all supports");
    getAllSupport(req, res);
});

fastify.post("/sendMail", (req, res) => {
    contactMail(req, res);
});


exports.support = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
            requestHandler(req, res);
        });
    });
});